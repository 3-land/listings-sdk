import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface GlobalFeeFields {
  delegate: PublicKey
  fee: BN
  feePercentage: number
  feeType: types.FeeTypeKind
}

export interface GlobalFeeJSON {
  delegate: string
  fee: string
  feePercentage: number
  feeType: types.FeeTypeJSON
}

export class GlobalFee {
  readonly delegate: PublicKey
  readonly fee: BN
  readonly feePercentage: number
  readonly feeType: types.FeeTypeKind

  constructor(fields: GlobalFeeFields) {
    this.delegate = fields.delegate
    this.fee = fields.fee
    this.feePercentage = fields.feePercentage
    this.feeType = fields.feeType
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("delegate"),
        borsh.u64("fee"),
        borsh.u16("feePercentage"),
        types.FeeType.layout("feeType"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new GlobalFee({
      delegate: obj.delegate,
      fee: obj.fee,
      feePercentage: obj.feePercentage,
      feeType: types.FeeType.fromDecoded(obj.feeType),
    })
  }

  static toEncodable(fields: GlobalFeeFields) {
    return {
      delegate: fields.delegate,
      fee: fields.fee,
      feePercentage: fields.feePercentage,
      feeType: fields.feeType.toEncodable(),
    }
  }

  toJSON(): GlobalFeeJSON {
    return {
      delegate: this.delegate.toString(),
      fee: this.fee.toString(),
      feePercentage: this.feePercentage,
      feeType: this.feeType.toJSON(),
    }
  }

  static fromJSON(obj: GlobalFeeJSON): GlobalFee {
    return new GlobalFee({
      delegate: new PublicKey(obj.delegate),
      fee: new BN(obj.fee),
      feePercentage: obj.feePercentage,
      feeType: types.FeeType.fromJSON(obj.feeType),
    })
  }

  toEncodable() {
    return GlobalFee.toEncodable(this)
  }
}
