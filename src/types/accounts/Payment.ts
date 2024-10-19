import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PaymentFields {
  class: types.PaymentClassKind
  hash: Array<number>
}

export interface PaymentJSON {
  class: types.PaymentClassJSON
  hash: Array<number>
}

export class Payment {
  readonly class: types.PaymentClassKind
  readonly hash: Array<number>

  static readonly discriminator = Buffer.from([
    227, 231, 51, 26, 244, 88, 4, 148,
  ])

  static readonly layout = borsh.struct([
    types.PaymentClass.layout("class"),
    borsh.array(borsh.u8(), 32, "hash"),
  ])

  constructor(fields: PaymentFields) {
    this.class = fields.class
    this.hash = fields.hash
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Payment | null> {
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
  ): Promise<Array<Payment | null>> {
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

  static decode(data: Buffer): Payment {
    if (!data.slice(0, 8).equals(Payment.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Payment.layout.decode(data.slice(8))

    return new Payment({
      class: types.PaymentClass.fromDecoded(dec.class),
      hash: dec.hash,
    })
  }

  toJSON(): PaymentJSON {
    return {
      class: this.class.toJSON(),
      hash: this.hash,
    }
  }

  static fromJSON(obj: PaymentJSON): Payment {
    return new Payment({
      class: types.PaymentClass.fromJSON(obj.class),
      hash: obj.hash,
    })
  }
}
