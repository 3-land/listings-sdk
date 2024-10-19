import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FakeDepositFields {
  key: BN
  track: types.BurnCountFields
}

export interface FakeDepositJSON {
  key: string
  track: types.BurnCountJSON
}

export class FakeDeposit {
  readonly key: BN
  readonly track: types.BurnCount

  constructor(fields: FakeDepositFields) {
    this.key = fields.key
    this.track = new types.BurnCount({ ...fields.track })
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("key"), types.BurnCount.layout("track")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FakeDeposit({
      key: obj.key,
      track: types.BurnCount.fromDecoded(obj.track),
    })
  }

  static toEncodable(fields: FakeDepositFields) {
    return {
      key: fields.key,
      track: types.BurnCount.toEncodable(fields.track),
    }
  }

  toJSON(): FakeDepositJSON {
    return {
      key: this.key.toString(),
      track: this.track.toJSON(),
    }
  }

  static fromJSON(obj: FakeDepositJSON): FakeDeposit {
    return new FakeDeposit({
      key: new BN(obj.key),
      track: types.BurnCount.fromJSON(obj.track),
    })
  }

  toEncodable() {
    return FakeDeposit.toEncodable(this)
  }
}
