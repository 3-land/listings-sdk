import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ZeroContentFields {
  cards: Array<number>
}

export interface ZeroContentJSON {
  cards: Array<number>
}

export class ZeroContent {
  readonly cards: Array<number>

  static readonly discriminator = Buffer.from([
    60, 71, 181, 209, 154, 77, 4, 225,
  ])

  static readonly layout = borsh.struct([
    borsh.array(borsh.u8(), 10000000, "cards"),
  ])

  constructor(fields: ZeroContentFields) {
    this.cards = fields.cards
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ZeroContent | null> {
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
  ): Promise<Array<ZeroContent | null>> {
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

  static decode(data: Buffer): ZeroContent {
    if (!data.slice(0, 8).equals(ZeroContent.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ZeroContent.layout.decode(data.slice(8))

    return new ZeroContent({
      cards: dec.cards,
    })
  }

  toJSON(): ZeroContentJSON {
    return {
      cards: this.cards,
    }
  }

  static fromJSON(obj: ZeroContentJSON): ZeroContent {
    return new ZeroContent({
      cards: obj.cards,
    })
  }
}
