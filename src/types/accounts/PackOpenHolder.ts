import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PackOpenHolderFields {
  class: types.AccountClassKind
  state: types.PackOpenHolderStateKind
  pack: PublicKey
  creator: PublicKey
  claimer: PublicKey
  packType: types.PackTypeKind
  items: Array<types.SelectedCardFields>
}

export interface PackOpenHolderJSON {
  class: types.AccountClassJSON
  state: types.PackOpenHolderStateJSON
  pack: string
  creator: string
  claimer: string
  packType: types.PackTypeJSON
  items: Array<types.SelectedCardJSON>
}

export class PackOpenHolder {
  readonly class: types.AccountClassKind
  readonly state: types.PackOpenHolderStateKind
  readonly pack: PublicKey
  readonly creator: PublicKey
  readonly claimer: PublicKey
  readonly packType: types.PackTypeKind
  readonly items: Array<types.SelectedCard>

  static readonly discriminator = Buffer.from([
    54, 190, 160, 171, 255, 212, 144, 120,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.PackOpenHolderState.layout("state"),
    borsh.publicKey("pack"),
    borsh.publicKey("creator"),
    borsh.publicKey("claimer"),
    types.PackType.layout("packType"),
    borsh.vec(types.SelectedCard.layout(), "items"),
  ])

  constructor(fields: PackOpenHolderFields) {
    this.class = fields.class
    this.state = fields.state
    this.pack = fields.pack
    this.creator = fields.creator
    this.claimer = fields.claimer
    this.packType = fields.packType
    this.items = fields.items.map((item) => new types.SelectedCard({ ...item }))
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PackOpenHolder | null> {
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
  ): Promise<Array<PackOpenHolder | null>> {
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

  static decode(data: Buffer): PackOpenHolder {
    if (!data.slice(0, 8).equals(PackOpenHolder.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = PackOpenHolder.layout.decode(data.slice(8))

    return new PackOpenHolder({
      class: types.AccountClass.fromDecoded(dec.class),
      state: types.PackOpenHolderState.fromDecoded(dec.state),
      pack: dec.pack,
      creator: dec.creator,
      claimer: dec.claimer,
      packType: types.PackType.fromDecoded(dec.packType),
      items: dec.items.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.SelectedCard.fromDecoded(item)
      ),
    })
  }

  toJSON(): PackOpenHolderJSON {
    return {
      class: this.class.toJSON(),
      state: this.state.toJSON(),
      pack: this.pack.toString(),
      creator: this.creator.toString(),
      claimer: this.claimer.toString(),
      packType: this.packType.toJSON(),
      items: this.items.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: PackOpenHolderJSON): PackOpenHolder {
    return new PackOpenHolder({
      class: types.AccountClass.fromJSON(obj.class),
      state: types.PackOpenHolderState.fromJSON(obj.state),
      pack: new PublicKey(obj.pack),
      creator: new PublicKey(obj.creator),
      claimer: new PublicKey(obj.claimer),
      packType: types.PackType.fromJSON(obj.packType),
      items: obj.items.map((item) => types.SelectedCard.fromJSON(item)),
    })
  }
}
