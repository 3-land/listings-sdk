import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BurnCountFields {
  list: Array<types.FakeBurnCountFields>
}

export interface BurnCountJSON {
  list: Array<types.FakeBurnCountJSON>
}

export class BurnCount {
  readonly list: Array<types.FakeBurnCount>

  constructor(fields: BurnCountFields) {
    this.list = fields.list.map((item) => new types.FakeBurnCount({ ...item }))
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.vec(types.FakeBurnCount.layout(), "list")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new BurnCount({
      list: obj.list.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.FakeBurnCount.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: BurnCountFields) {
    return {
      list: fields.list.map((item) => types.FakeBurnCount.toEncodable(item)),
    }
  }

  toJSON(): BurnCountJSON {
    return {
      list: this.list.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: BurnCountJSON): BurnCount {
    return new BurnCount({
      list: obj.list.map((item) => types.FakeBurnCount.fromJSON(item)),
    })
  }

  toEncodable() {
    return BurnCount.toEncodable(this)
  }
}
