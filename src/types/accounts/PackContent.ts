import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PackContentFields {
  class: types.AccountClassKind
  cards: PublicKey
}

export interface PackContentJSON {
  class: types.AccountClassJSON
  cards: string
}

export class PackContent {
  readonly class: types.AccountClassKind
  readonly cards: PublicKey

  static readonly discriminator = Buffer.from([
    89, 183, 142, 94, 35, 115, 253, 159,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.publicKey("cards"),
  ])

  constructor(fields: PackContentFields) {
    this.class = fields.class
    this.cards = fields.cards
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PackContent | null> {
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
  ): Promise<Array<PackContent | null>> {
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

  static decode(data: Buffer): PackContent {
    if (!data.slice(0, 8).equals(PackContent.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = PackContent.layout.decode(data.slice(8))

    return new PackContent({
      class: types.AccountClass.fromDecoded(dec.class),
      cards: dec.cards,
    })
  }

  toJSON(): PackContentJSON {
    return {
      class: this.class.toJSON(),
      cards: this.cards.toString(),
    }
  }

  static fromJSON(obj: PackContentJSON): PackContent {
    return new PackContent({
      class: types.AccountClass.fromJSON(obj.class),
      cards: new PublicKey(obj.cards),
    })
  }
}
