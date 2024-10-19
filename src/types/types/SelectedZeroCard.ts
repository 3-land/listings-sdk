import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SelectedZeroCardFields {
  id: number
  edition: number
}

export interface SelectedZeroCardJSON {
  id: number
  edition: number
}

export class SelectedZeroCard {
  readonly id: number
  readonly edition: number

  constructor(fields: SelectedZeroCardFields) {
    this.id = fields.id
    this.edition = fields.edition
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u32("id"), borsh.u32("edition")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SelectedZeroCard({
      id: obj.id,
      edition: obj.edition,
    })
  }

  static toEncodable(fields: SelectedZeroCardFields) {
    return {
      id: fields.id,
      edition: fields.edition,
    }
  }

  toJSON(): SelectedZeroCardJSON {
    return {
      id: this.id,
      edition: this.edition,
    }
  }

  static fromJSON(obj: SelectedZeroCardJSON): SelectedZeroCard {
    return new SelectedZeroCard({
      id: obj.id,
      edition: obj.edition,
    })
  }

  toEncodable() {
    return SelectedZeroCard.toEncodable(this)
  }
}
