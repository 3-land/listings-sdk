import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CollectTrackFields {
  collected: BN
  spent: BN
}

export interface CollectTrackJSON {
  collected: string
  spent: string
}

export class CollectTrack {
  readonly collected: BN
  readonly spent: BN

  constructor(fields: CollectTrackFields) {
    this.collected = fields.collected
    this.spent = fields.spent
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("collected"), borsh.u64("spent")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CollectTrack({
      collected: obj.collected,
      spent: obj.spent,
    })
  }

  static toEncodable(fields: CollectTrackFields) {
    return {
      collected: fields.collected,
      spent: fields.spent,
    }
  }

  toJSON(): CollectTrackJSON {
    return {
      collected: this.collected.toString(),
      spent: this.spent.toString(),
    }
  }

  static fromJSON(obj: CollectTrackJSON): CollectTrack {
    return new CollectTrack({
      collected: new BN(obj.collected),
      spent: new BN(obj.spent),
    })
  }

  toEncodable() {
    return CollectTrack.toEncodable(this)
  }
}
