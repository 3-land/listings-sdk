import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ItemReserveList2Fields {}

export interface ItemReserveList2JSON {}

export class ItemReserveList2 {
  static readonly discriminator = Buffer.from([
    228, 108, 231, 95, 72, 92, 29, 53,
  ])

  static readonly layout = borsh.struct([])

  constructor(fields: ItemReserveList2Fields) {}

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ItemReserveList2 | null> {
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
  ): Promise<Array<ItemReserveList2 | null>> {
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

  static decode(data: Buffer): ItemReserveList2 {
    if (!data.slice(0, 8).equals(ItemReserveList2.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ItemReserveList2.layout.decode(data.slice(8))

    return new ItemReserveList2({})
  }

  toJSON(): ItemReserveList2JSON {
    return {}
  }

  static fromJSON(obj: ItemReserveList2JSON): ItemReserveList2 {
    return new ItemReserveList2({})
  }
}
