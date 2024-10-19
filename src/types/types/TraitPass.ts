import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TraitPassFields {
  list: Array<types.TraitPassTypeKind>
}

export interface TraitPassJSON {
  list: Array<types.TraitPassTypeJSON>
}

export class TraitPass {
  readonly list: Array<types.TraitPassTypeKind>

  constructor(fields: TraitPassFields) {
    this.list = fields.list
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.vec(types.TraitPassType.layout(), "list")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TraitPass({
      list: obj.list.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.TraitPassType.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: TraitPassFields) {
    return {
      list: fields.list.map((item) => item.toEncodable()),
    }
  }

  toJSON(): TraitPassJSON {
    return {
      list: this.list.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: TraitPassJSON): TraitPass {
    return new TraitPass({
      list: obj.list.map((item) => types.TraitPassType.fromJSON(item)),
    })
  }

  toEncodable() {
    return TraitPass.toEncodable(this)
  }
}
