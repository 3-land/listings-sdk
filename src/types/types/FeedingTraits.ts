import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FeedingTraitsFields {
  list: Array<types.TraitInitKind>
}

export interface FeedingTraitsJSON {
  list: Array<types.TraitInitJSON>
}

export class FeedingTraits {
  readonly list: Array<types.TraitInitKind>

  constructor(fields: FeedingTraitsFields) {
    this.list = fields.list
  }

  static layout(property?: string) {
    return borsh.struct([borsh.vec(types.TraitInit.layout(), "list")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FeedingTraits({
      list: obj.list.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.TraitInit.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: FeedingTraitsFields) {
    return {
      list: fields.list.map((item) => item.toEncodable()),
    }
  }

  toJSON(): FeedingTraitsJSON {
    return {
      list: this.list.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: FeedingTraitsJSON): FeedingTraits {
    return new FeedingTraits({
      list: obj.list.map((item) => types.TraitInit.fromJSON(item)),
    })
  }

  toEncodable() {
    return FeedingTraits.toEncodable(this)
  }
}
