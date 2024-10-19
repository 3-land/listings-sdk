import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BuyTrackFields {
  count: number
  time: number
}

export interface BuyTrackJSON {
  count: number
  time: number
}

export class BuyTrack {
  readonly count: number
  readonly time: number

  static readonly discriminator = Buffer.from([
    127, 195, 236, 128, 20, 28, 179, 140,
  ])

  static readonly layout = borsh.struct([borsh.u32("count"), borsh.u32("time")])

  constructor(fields: BuyTrackFields) {
    this.count = fields.count
    this.time = fields.time
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<BuyTrack | null> {
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
  ): Promise<Array<BuyTrack | null>> {
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

  static decode(data: Buffer): BuyTrack {
    if (!data.slice(0, 8).equals(BuyTrack.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = BuyTrack.layout.decode(data.slice(8))

    return new BuyTrack({
      count: dec.count,
      time: dec.time,
    })
  }

  toJSON(): BuyTrackJSON {
    return {
      count: this.count,
      time: this.time,
    }
  }

  static fromJSON(obj: BuyTrackJSON): BuyTrack {
    return new BuyTrack({
      count: obj.count,
      time: obj.time,
    })
  }
}
