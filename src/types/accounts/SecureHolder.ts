import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SecureHolderFields {
  class: types.AccountClassKind
  payload: types.EncryptedPayloadFields
}

export interface SecureHolderJSON {
  class: types.AccountClassJSON
  payload: types.EncryptedPayloadJSON
}

export class SecureHolder {
  readonly class: types.AccountClassKind
  readonly payload: types.EncryptedPayload

  static readonly discriminator = Buffer.from([
    103, 104, 14, 27, 41, 183, 120, 21,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.EncryptedPayload.layout("payload"),
  ])

  constructor(fields: SecureHolderFields) {
    this.class = fields.class
    this.payload = new types.EncryptedPayload({ ...fields.payload })
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<SecureHolder | null> {
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
  ): Promise<Array<SecureHolder | null>> {
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

  static decode(data: Buffer): SecureHolder {
    if (!data.slice(0, 8).equals(SecureHolder.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SecureHolder.layout.decode(data.slice(8))

    return new SecureHolder({
      class: types.AccountClass.fromDecoded(dec.class),
      payload: types.EncryptedPayload.fromDecoded(dec.payload),
    })
  }

  toJSON(): SecureHolderJSON {
    return {
      class: this.class.toJSON(),
      payload: this.payload.toJSON(),
    }
  }

  static fromJSON(obj: SecureHolderJSON): SecureHolder {
    return new SecureHolder({
      class: types.AccountClass.fromJSON(obj.class),
      payload: types.EncryptedPayload.fromJSON(obj.payload),
    })
  }
}
