import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AuthorityFields {}

export interface AuthorityJSON {}

export class Authority {
  static readonly discriminator = Buffer.from([
    36, 108, 254, 18, 167, 144, 27, 36,
  ])

  static readonly layout = borsh.struct([])

  constructor(fields: AuthorityFields) {}

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Authority | null> {
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
  ): Promise<Array<Authority | null>> {
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

  static decode(data: Buffer): Authority {
    if (!data.slice(0, 8).equals(Authority.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Authority.layout.decode(data.slice(8))

    return new Authority({})
  }

  toJSON(): AuthorityJSON {
    return {}
  }

  static fromJSON(obj: AuthorityJSON): Authority {
    return new Authority({})
  }
}
