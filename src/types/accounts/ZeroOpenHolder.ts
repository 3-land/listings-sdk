import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ZeroOpenHolderFields {
  class: types.AccountClassKind
  storeHalfHash: Array<number>
  state: types.PackOpenHolderStateKind
  paidFee: number
  pack: PublicKey
  creator: PublicKey
  claimer: PublicKey
  randomBase: BN
  packType: types.PackTypeKind
  sendToVault: types.MemeVaultProofFields | null
  items: Array<types.SelectedZeroCardFields>
}

export interface ZeroOpenHolderJSON {
  class: types.AccountClassJSON
  storeHalfHash: Array<number>
  state: types.PackOpenHolderStateJSON
  paidFee: number
  pack: string
  creator: string
  claimer: string
  randomBase: string
  packType: types.PackTypeJSON
  sendToVault: types.MemeVaultProofJSON | null
  items: Array<types.SelectedZeroCardJSON>
}

export class ZeroOpenHolder {
  readonly class: types.AccountClassKind
  readonly storeHalfHash: Array<number>
  readonly state: types.PackOpenHolderStateKind
  readonly paidFee: number
  readonly pack: PublicKey
  readonly creator: PublicKey
  readonly claimer: PublicKey
  readonly randomBase: BN
  readonly packType: types.PackTypeKind
  readonly sendToVault: types.MemeVaultProof | null
  readonly items: Array<types.SelectedZeroCard>

  static readonly discriminator = Buffer.from([
    106, 194, 12, 193, 165, 210, 56, 2,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.array(borsh.u8(), 4, "storeHalfHash"),
    types.PackOpenHolderState.layout("state"),
    borsh.u8("paidFee"),
    borsh.publicKey("pack"),
    borsh.publicKey("creator"),
    borsh.publicKey("claimer"),
    borsh.u64("randomBase"),
    types.PackType.layout("packType"),
    borsh.option(types.MemeVaultProof.layout(), "sendToVault"),
    borsh.vec(types.SelectedZeroCard.layout(), "items"),
  ])

  constructor(fields: ZeroOpenHolderFields) {
    this.class = fields.class
    this.storeHalfHash = fields.storeHalfHash
    this.state = fields.state
    this.paidFee = fields.paidFee
    this.pack = fields.pack
    this.creator = fields.creator
    this.claimer = fields.claimer
    this.randomBase = fields.randomBase
    this.packType = fields.packType
    this.sendToVault =
      (fields.sendToVault &&
        new types.MemeVaultProof({ ...fields.sendToVault })) ||
      null
    this.items = fields.items.map(
      (item) => new types.SelectedZeroCard({ ...item })
    )
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ZeroOpenHolder | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<ZeroOpenHolder | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): ZeroOpenHolder {
    if (!data.slice(0, 8).equals(ZeroOpenHolder.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ZeroOpenHolder.layout.decode(data.slice(8))

    return new ZeroOpenHolder({
      class: types.AccountClass.fromDecoded(dec.class),
      storeHalfHash: dec.storeHalfHash,
      state: types.PackOpenHolderState.fromDecoded(dec.state),
      paidFee: dec.paidFee,
      pack: dec.pack,
      creator: dec.creator,
      claimer: dec.claimer,
      randomBase: dec.randomBase,
      packType: types.PackType.fromDecoded(dec.packType),
      sendToVault:
        (dec.sendToVault &&
          types.MemeVaultProof.fromDecoded(dec.sendToVault)) ||
        null,
      items: dec.items.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.SelectedZeroCard.fromDecoded(item)
      ),
    })
  }

  toJSON(): ZeroOpenHolderJSON {
    return {
      class: this.class.toJSON(),
      storeHalfHash: this.storeHalfHash,
      state: this.state.toJSON(),
      paidFee: this.paidFee,
      pack: this.pack.toString(),
      creator: this.creator.toString(),
      claimer: this.claimer.toString(),
      randomBase: this.randomBase.toString(),
      packType: this.packType.toJSON(),
      sendToVault: (this.sendToVault && this.sendToVault.toJSON()) || null,
      items: this.items.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: ZeroOpenHolderJSON): ZeroOpenHolder {
    return new ZeroOpenHolder({
      class: types.AccountClass.fromJSON(obj.class),
      storeHalfHash: obj.storeHalfHash,
      state: types.PackOpenHolderState.fromJSON(obj.state),
      paidFee: obj.paidFee,
      pack: new PublicKey(obj.pack),
      creator: new PublicKey(obj.creator),
      claimer: new PublicKey(obj.claimer),
      randomBase: new BN(obj.randomBase),
      packType: types.PackType.fromJSON(obj.packType),
      sendToVault:
        (obj.sendToVault && types.MemeVaultProof.fromJSON(obj.sendToVault)) ||
        null,
      items: obj.items.map((item) => types.SelectedZeroCard.fromJSON(item)),
    })
  }
}
