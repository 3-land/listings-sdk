import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface AccountHasherFields {
  seeds: Array<types.SeedFields>
  insertAt: number
  program: PublicKey
  bump: number
}

export interface AccountHasherJSON {
  seeds: Array<types.SeedJSON>
  insertAt: number
  program: string
  bump: number
}

export class AccountHasher {
  readonly seeds: Array<types.Seed>
  readonly insertAt: number
  readonly program: PublicKey
  readonly bump: number

  constructor(fields: AccountHasherFields) {
    this.seeds = fields.seeds.map((item) => new types.Seed({ ...item }))
    this.insertAt = fields.insertAt
    this.program = fields.program
    this.bump = fields.bump
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.vec(types.Seed.layout(), "seeds"),
        borsh.u8("insertAt"),
        borsh.publicKey("program"),
        borsh.u8("bump"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new AccountHasher({
      seeds: obj.seeds.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Seed.fromDecoded(item)
      ),
      insertAt: obj.insertAt,
      program: obj.program,
      bump: obj.bump,
    })
  }

  static toEncodable(fields: AccountHasherFields) {
    return {
      seeds: fields.seeds.map((item) => types.Seed.toEncodable(item)),
      insertAt: fields.insertAt,
      program: fields.program,
      bump: fields.bump,
    }
  }

  toJSON(): AccountHasherJSON {
    return {
      seeds: this.seeds.map((item) => item.toJSON()),
      insertAt: this.insertAt,
      program: this.program.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: AccountHasherJSON): AccountHasher {
    return new AccountHasher({
      seeds: obj.seeds.map((item) => types.Seed.fromJSON(item)),
      insertAt: obj.insertAt,
      program: new PublicKey(obj.program),
      bump: obj.bump,
    })
  }

  toEncodable() {
    return AccountHasher.toEncodable(this)
  }
}
