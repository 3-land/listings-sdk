import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CreatorGateArgsFields {
  key: PublicKey
}

export interface CreatorGateArgsJSON {
  key: string
}

export class CreatorGateArgs {
  readonly key: PublicKey

  constructor(fields: CreatorGateArgsFields) {
    this.key = fields.key
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey("key")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CreatorGateArgs({
      key: obj.key,
    })
  }

  static toEncodable(fields: CreatorGateArgsFields) {
    return {
      key: fields.key,
    }
  }

  toJSON(): CreatorGateArgsJSON {
    return {
      key: this.key.toString(),
    }
  }

  static fromJSON(obj: CreatorGateArgsJSON): CreatorGateArgs {
    return new CreatorGateArgs({
      key: new PublicKey(obj.key),
    })
  }

  toEncodable() {
    return CreatorGateArgs.toEncodable(this)
  }
}
