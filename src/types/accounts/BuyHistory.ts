import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BuyHistoryFields {
  class: types.AccountClassKind
  buyType: types.BuyHistoryClassKind
  owner: PublicKey
  item: PublicKey
  store: PublicKey
}

export interface BuyHistoryJSON {
  class: types.AccountClassJSON
  buyType: types.BuyHistoryClassJSON
  owner: string
  item: string
  store: string
}

export class BuyHistory {
  readonly class: types.AccountClassKind
  readonly buyType: types.BuyHistoryClassKind
  readonly owner: PublicKey
  readonly item: PublicKey
  readonly store: PublicKey

  static readonly discriminator = Buffer.from([
    10, 217, 83, 243, 244, 164, 203, 202,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.BuyHistoryClass.layout("buyType"),
    borsh.publicKey("owner"),
    borsh.publicKey("item"),
    borsh.publicKey("store"),
  ])

  constructor(fields: BuyHistoryFields) {
    this.class = fields.class
    this.buyType = fields.buyType
    this.owner = fields.owner
    this.item = fields.item
    this.store = fields.store
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<BuyHistory | null> {
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
  ): Promise<Array<BuyHistory | null>> {
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

  static decode(data: Buffer): BuyHistory {
    if (!data.slice(0, 8).equals(BuyHistory.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = BuyHistory.layout.decode(data.slice(8))

    return new BuyHistory({
      class: types.AccountClass.fromDecoded(dec.class),
      buyType: types.BuyHistoryClass.fromDecoded(dec.buyType),
      owner: dec.owner,
      item: dec.item,
      store: dec.store,
    })
  }

  toJSON(): BuyHistoryJSON {
    return {
      class: this.class.toJSON(),
      buyType: this.buyType.toJSON(),
      owner: this.owner.toString(),
      item: this.item.toString(),
      store: this.store.toString(),
    }
  }

  static fromJSON(obj: BuyHistoryJSON): BuyHistory {
    return new BuyHistory({
      class: types.AccountClass.fromJSON(obj.class),
      buyType: types.BuyHistoryClass.fromJSON(obj.buyType),
      owner: new PublicKey(obj.owner),
      item: new PublicKey(obj.item),
      store: new PublicKey(obj.store),
    })
  }
}
