import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DepositFields {
  depositType: types.DepositTypeKind
  format: types.DepositFormatKind
  interestHash: BN
  proofSize: number
}

export interface DepositJSON {
  depositType: types.DepositTypeJSON
  format: types.DepositFormatJSON
  interestHash: string
  proofSize: number
}

export class Deposit {
  readonly depositType: types.DepositTypeKind
  readonly format: types.DepositFormatKind
  readonly interestHash: BN
  readonly proofSize: number

  constructor(fields: DepositFields) {
    this.depositType = fields.depositType
    this.format = fields.format
    this.interestHash = fields.interestHash
    this.proofSize = fields.proofSize
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        types.DepositType.layout("depositType"),
        types.DepositFormat.layout("format"),
        borsh.u64("interestHash"),
        borsh.u8("proofSize"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Deposit({
      depositType: types.DepositType.fromDecoded(obj.depositType),
      format: types.DepositFormat.fromDecoded(obj.format),
      interestHash: obj.interestHash,
      proofSize: obj.proofSize,
    })
  }

  static toEncodable(fields: DepositFields) {
    return {
      depositType: fields.depositType.toEncodable(),
      format: fields.format.toEncodable(),
      interestHash: fields.interestHash,
      proofSize: fields.proofSize,
    }
  }

  toJSON(): DepositJSON {
    return {
      depositType: this.depositType.toJSON(),
      format: this.format.toJSON(),
      interestHash: this.interestHash.toString(),
      proofSize: this.proofSize,
    }
  }

  static fromJSON(obj: DepositJSON): Deposit {
    return new Deposit({
      depositType: types.DepositType.fromJSON(obj.depositType),
      format: types.DepositFormat.fromJSON(obj.format),
      interestHash: new BN(obj.interestHash),
      proofSize: obj.proofSize,
    })
  }

  toEncodable() {
    return Deposit.toEncodable(this)
  }
}
