import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface StoresHolderFields {
  class: types.AccountClassKind
  slot: BN
  creator: PublicKey
  count: BN
  defaultGlobalFee: types.GlobalFeeFields | null
}

export interface StoresHolderJSON {
  class: types.AccountClassJSON
  slot: string
  creator: string
  count: string
  defaultGlobalFee: types.GlobalFeeJSON | null
}

export class StoresHolder {
  readonly class: types.AccountClassKind
  readonly slot: BN
  readonly creator: PublicKey
  readonly count: BN
  readonly defaultGlobalFee: types.GlobalFee | null

  static readonly discriminator = Buffer.from([
    237, 16, 131, 248, 150, 182, 165, 234,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("slot"),
    borsh.publicKey("creator"),
    borsh.u64("count"),
    borsh.option(types.GlobalFee.layout(), "defaultGlobalFee"),
  ])

  constructor(fields: StoresHolderFields) {
    this.class = fields.class
    this.slot = fields.slot
    this.creator = fields.creator
    this.count = fields.count
    this.defaultGlobalFee =
      (fields.defaultGlobalFee &&
        new types.GlobalFee({ ...fields.defaultGlobalFee })) ||
      null
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<StoresHolder | null> {
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
  ): Promise<Array<StoresHolder | null>> {
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

  static decode(data: Buffer): StoresHolder {
    if (!data.slice(0, 8).equals(StoresHolder.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = StoresHolder.layout.decode(data.slice(8))

    return new StoresHolder({
      class: types.AccountClass.fromDecoded(dec.class),
      slot: dec.slot,
      creator: dec.creator,
      count: dec.count,
      defaultGlobalFee:
        (dec.defaultGlobalFee &&
          types.GlobalFee.fromDecoded(dec.defaultGlobalFee)) ||
        null,
    })
  }

  toJSON(): StoresHolderJSON {
    return {
      class: this.class.toJSON(),
      slot: this.slot.toString(),
      creator: this.creator.toString(),
      count: this.count.toString(),
      defaultGlobalFee:
        (this.defaultGlobalFee && this.defaultGlobalFee.toJSON()) || null,
    }
  }

  static fromJSON(obj: StoresHolderJSON): StoresHolder {
    return new StoresHolder({
      class: types.AccountClass.fromJSON(obj.class),
      slot: new BN(obj.slot),
      creator: new PublicKey(obj.creator),
      count: new BN(obj.count),
      defaultGlobalFee:
        (obj.defaultGlobalFee &&
          types.GlobalFee.fromJSON(obj.defaultGlobalFee)) ||
        null,
    })
  }
}
