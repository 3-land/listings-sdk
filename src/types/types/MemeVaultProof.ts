import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MemeVaultProofFields {
  amount: BN
  halfCurrencyHash: number
}

export interface MemeVaultProofJSON {
  amount: string
  halfCurrencyHash: number
}

export class MemeVaultProof {
  readonly amount: BN
  readonly halfCurrencyHash: number

  constructor(fields: MemeVaultProofFields) {
    this.amount = fields.amount
    this.halfCurrencyHash = fields.halfCurrencyHash
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("amount"), borsh.u32("halfCurrencyHash")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MemeVaultProof({
      amount: obj.amount,
      halfCurrencyHash: obj.halfCurrencyHash,
    })
  }

  static toEncodable(fields: MemeVaultProofFields) {
    return {
      amount: fields.amount,
      halfCurrencyHash: fields.halfCurrencyHash,
    }
  }

  toJSON(): MemeVaultProofJSON {
    return {
      amount: this.amount.toString(),
      halfCurrencyHash: this.halfCurrencyHash,
    }
  }

  static fromJSON(obj: MemeVaultProofJSON): MemeVaultProof {
    return new MemeVaultProof({
      amount: new BN(obj.amount),
      halfCurrencyHash: obj.halfCurrencyHash,
    })
  }

  toEncodable() {
    return MemeVaultProof.toEncodable(this)
  }
}
