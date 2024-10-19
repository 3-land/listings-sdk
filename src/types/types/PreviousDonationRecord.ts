import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PreviousDonationRecordFields {
  cnft: types.CnftDataFields
  amount: BN
  message: string
}

export interface PreviousDonationRecordJSON {
  cnft: types.CnftDataJSON
  amount: string
  message: string
}

export class PreviousDonationRecord {
  readonly cnft: types.CnftData
  readonly amount: BN
  readonly message: string

  constructor(fields: PreviousDonationRecordFields) {
    this.cnft = new types.CnftData({ ...fields.cnft })
    this.amount = fields.amount
    this.message = fields.message
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        types.CnftData.layout("cnft"),
        borsh.u64("amount"),
        borsh.str("message"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new PreviousDonationRecord({
      cnft: types.CnftData.fromDecoded(obj.cnft),
      amount: obj.amount,
      message: obj.message,
    })
  }

  static toEncodable(fields: PreviousDonationRecordFields) {
    return {
      cnft: types.CnftData.toEncodable(fields.cnft),
      amount: fields.amount,
      message: fields.message,
    }
  }

  toJSON(): PreviousDonationRecordJSON {
    return {
      cnft: this.cnft.toJSON(),
      amount: this.amount.toString(),
      message: this.message,
    }
  }

  static fromJSON(obj: PreviousDonationRecordJSON): PreviousDonationRecord {
    return new PreviousDonationRecord({
      cnft: types.CnftData.fromJSON(obj.cnft),
      amount: new BN(obj.amount),
      message: obj.message,
    })
  }

  toEncodable() {
    return PreviousDonationRecord.toEncodable(this)
  }
}
