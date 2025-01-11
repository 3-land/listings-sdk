import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CurrencyFields {
  address: PublicKey
  deposit: BN
  secured: BN
  decimals: number
}

export interface CurrencyJSON {
  address: string
  deposit: string
  secured: string
  decimals: number
}

export class Currency {
  readonly address: PublicKey
  readonly deposit: BN
  readonly secured: BN
  readonly decimals: number

  constructor(fields: CurrencyFields) {
    this.address = fields.address
    this.deposit = fields.deposit
    this.secured = fields.secured
    this.decimals = fields.decimals
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("address"),
        borsh.u64("deposit"),
        borsh.u64("secured"),
        borsh.u8("decimals"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Currency({
      address: obj.address,
      deposit: obj.deposit,
      secured: obj.secured,
      decimals: obj.decimals,
    })
  }

  static toEncodable(fields: CurrencyFields) {
    return {
      address: fields.address,
      deposit: fields.deposit,
      secured: fields.secured,
      decimals: fields.decimals,
    }
  }

  toJSON(): CurrencyJSON {
    return {
      address: this.address.toString(),
      deposit: this.deposit.toString(),
      secured: this.secured.toString(),
      decimals: this.decimals,
    }
  }

  static fromJSON(obj: CurrencyJSON): Currency {
    return new Currency({
      address: new PublicKey(obj.address),
      deposit: new BN(obj.deposit),
      secured: new BN(obj.secured),
      decimals: obj.decimals,
    })
  }

  toEncodable() {
    return Currency.toEncodable(this)
  }
}
