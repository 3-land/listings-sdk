import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface LutVaultFields {
  address: PublicKey
  creator: PublicKey
}

export interface LutVaultJSON {
  address: string
  creator: string
}

export class LutVault {
  readonly address: PublicKey
  readonly creator: PublicKey

  static readonly discriminator = Buffer.from([
    156, 232, 87, 247, 4, 41, 107, 182,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("address"),
    borsh.publicKey("creator"),
  ])

  constructor(fields: LutVaultFields) {
    this.address = fields.address
    this.creator = fields.creator
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<LutVault | null> {
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
  ): Promise<Array<LutVault | null>> {
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

  static decode(data: Buffer): LutVault {
    if (!data.slice(0, 8).equals(LutVault.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = LutVault.layout.decode(data.slice(8))

    return new LutVault({
      address: dec.address,
      creator: dec.creator,
    })
  }

  toJSON(): LutVaultJSON {
    return {
      address: this.address.toString(),
      creator: this.creator.toString(),
    }
  }

  static fromJSON(obj: LutVaultJSON): LutVault {
    return new LutVault({
      address: new PublicKey(obj.address),
      creator: new PublicKey(obj.creator),
    })
  }
}
