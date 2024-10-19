import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PackReceiptFields {
  class: types.AccountClassKind
  cnft: PublicKey
  pack: PublicKey
  creator: PublicKey
  state: types.PackStateKind
  cardsInside: number
  slot: BN
  created: number
}

export interface PackReceiptJSON {
  class: types.AccountClassJSON
  cnft: string
  pack: string
  creator: string
  state: types.PackStateJSON
  cardsInside: number
  slot: string
  created: number
}

export class PackReceipt {
  readonly class: types.AccountClassKind
  readonly cnft: PublicKey
  readonly pack: PublicKey
  readonly creator: PublicKey
  readonly state: types.PackStateKind
  readonly cardsInside: number
  readonly slot: BN
  readonly created: number

  static readonly discriminator = Buffer.from([
    117, 14, 250, 166, 162, 131, 180, 180,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.publicKey("cnft"),
    borsh.publicKey("pack"),
    borsh.publicKey("creator"),
    types.PackState.layout("state"),
    borsh.u8("cardsInside"),
    borsh.u64("slot"),
    borsh.u32("created"),
  ])

  constructor(fields: PackReceiptFields) {
    this.class = fields.class
    this.cnft = fields.cnft
    this.pack = fields.pack
    this.creator = fields.creator
    this.state = fields.state
    this.cardsInside = fields.cardsInside
    this.slot = fields.slot
    this.created = fields.created
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PackReceipt | null> {
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
  ): Promise<Array<PackReceipt | null>> {
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

  static decode(data: Buffer): PackReceipt {
    if (!data.slice(0, 8).equals(PackReceipt.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = PackReceipt.layout.decode(data.slice(8))

    return new PackReceipt({
      class: types.AccountClass.fromDecoded(dec.class),
      cnft: dec.cnft,
      pack: dec.pack,
      creator: dec.creator,
      state: types.PackState.fromDecoded(dec.state),
      cardsInside: dec.cardsInside,
      slot: dec.slot,
      created: dec.created,
    })
  }

  toJSON(): PackReceiptJSON {
    return {
      class: this.class.toJSON(),
      cnft: this.cnft.toString(),
      pack: this.pack.toString(),
      creator: this.creator.toString(),
      state: this.state.toJSON(),
      cardsInside: this.cardsInside,
      slot: this.slot.toString(),
      created: this.created,
    }
  }

  static fromJSON(obj: PackReceiptJSON): PackReceipt {
    return new PackReceipt({
      class: types.AccountClass.fromJSON(obj.class),
      cnft: new PublicKey(obj.cnft),
      pack: new PublicKey(obj.pack),
      creator: new PublicKey(obj.creator),
      state: types.PackState.fromJSON(obj.state),
      cardsInside: obj.cardsInside,
      slot: new BN(obj.slot),
      created: obj.created,
    })
  }
}
