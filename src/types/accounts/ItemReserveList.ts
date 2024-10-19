import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ItemReserveListFields {
  queue: PublicKey
}

export interface ItemReserveListJSON {
  queue: string
}

export class ItemReserveList {
  readonly queue: PublicKey

  static readonly discriminator = Buffer.from([
    91, 20, 28, 149, 203, 38, 189, 82,
  ])

  static readonly layout = borsh.struct([borsh.publicKey("queue")])

  constructor(fields: ItemReserveListFields) {
    this.queue = fields.queue
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ItemReserveList | null> {
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
  ): Promise<Array<ItemReserveList | null>> {
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

  static decode(data: Buffer): ItemReserveList {
    if (!data.slice(0, 8).equals(ItemReserveList.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ItemReserveList.layout.decode(data.slice(8))

    return new ItemReserveList({
      queue: dec.queue,
    })
  }

  toJSON(): ItemReserveListJSON {
    return {
      queue: this.queue.toString(),
    }
  }

  static fromJSON(obj: ItemReserveListJSON): ItemReserveList {
    return new ItemReserveList({
      queue: new PublicKey(obj.queue),
    })
  }
}
