import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BurnProgressFields {
  id: number
  burns: PublicKey
}

export interface BurnProgressJSON {
  id: number
  burns: string
}

export class BurnProgress {
  readonly id: number
  readonly burns: PublicKey

  static readonly discriminator = Buffer.from([
    12, 198, 91, 240, 229, 209, 22, 141,
  ])

  static readonly layout = borsh.struct([
    borsh.u16("id"),
    borsh.publicKey("burns"),
  ])

  constructor(fields: BurnProgressFields) {
    this.id = fields.id
    this.burns = fields.burns
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<BurnProgress | null> {
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
  ): Promise<Array<BurnProgress | null>> {
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

  static decode(data: Buffer): BurnProgress {
    if (!data.slice(0, 8).equals(BurnProgress.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = BurnProgress.layout.decode(data.slice(8))

    return new BurnProgress({
      id: dec.id,
      burns: dec.burns,
    })
  }

  toJSON(): BurnProgressJSON {
    return {
      id: this.id,
      burns: this.burns.toString(),
    }
  }

  static fromJSON(obj: BurnProgressJSON): BurnProgress {
    return new BurnProgress({
      id: obj.id,
      burns: new PublicKey(obj.burns),
    })
  }
}
