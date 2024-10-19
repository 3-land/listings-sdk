import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ZeroCardFields {}

export interface ZeroCardJSON {}

export class ZeroCard {
  static readonly discriminator = Buffer.from([
    31, 109, 105, 105, 213, 228, 142, 232,
  ])

  static readonly layout = borsh.struct([])

  constructor(fields: ZeroCardFields) {}

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ZeroCard | null> {
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
  ): Promise<Array<ZeroCard | null>> {
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

  static decode(data: Buffer): ZeroCard {
    if (!data.slice(0, 8).equals(ZeroCard.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ZeroCard.layout.decode(data.slice(8))

    return new ZeroCard({})
  }

  toJSON(): ZeroCardJSON {
    return {}
  }

  static fromJSON(obj: ZeroCardJSON): ZeroCard {
    return new ZeroCard({})
  }
}
