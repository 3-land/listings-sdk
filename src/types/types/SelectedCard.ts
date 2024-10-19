import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SelectedCardFields {
  id: number
  edition: number
}

export interface SelectedCardJSON {
  id: number
  edition: number
}

export class SelectedCard {
  readonly id: number
  readonly edition: number

  constructor(fields: SelectedCardFields) {
    this.id = fields.id
    this.edition = fields.edition
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("id"), borsh.u32("edition")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SelectedCard({
      id: obj.id,
      edition: obj.edition,
    })
  }

  static toEncodable(fields: SelectedCardFields) {
    return {
      id: fields.id,
      edition: fields.edition,
    }
  }

  toJSON(): SelectedCardJSON {
    return {
      id: this.id,
      edition: this.edition,
    }
  }

  static fromJSON(obj: SelectedCardJSON): SelectedCard {
    return new SelectedCard({
      id: obj.id,
      edition: obj.edition,
    })
  }

  toEncodable() {
    return SelectedCard.toEncodable(this)
  }
}
