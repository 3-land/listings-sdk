import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SaleTrackFields {
  created: BN
  sold: BN
  earned: BN
  collectors: BN
}

export interface SaleTrackJSON {
  created: string
  sold: string
  earned: string
  collectors: string
}

export class SaleTrack {
  readonly created: BN
  readonly sold: BN
  readonly earned: BN
  readonly collectors: BN

  constructor(fields: SaleTrackFields) {
    this.created = fields.created
    this.sold = fields.sold
    this.earned = fields.earned
    this.collectors = fields.collectors
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("created"),
        borsh.u64("sold"),
        borsh.u64("earned"),
        borsh.u64("collectors"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SaleTrack({
      created: obj.created,
      sold: obj.sold,
      earned: obj.earned,
      collectors: obj.collectors,
    })
  }

  static toEncodable(fields: SaleTrackFields) {
    return {
      created: fields.created,
      sold: fields.sold,
      earned: fields.earned,
      collectors: fields.collectors,
    }
  }

  toJSON(): SaleTrackJSON {
    return {
      created: this.created.toString(),
      sold: this.sold.toString(),
      earned: this.earned.toString(),
      collectors: this.collectors.toString(),
    }
  }

  static fromJSON(obj: SaleTrackJSON): SaleTrack {
    return new SaleTrack({
      created: new BN(obj.created),
      sold: new BN(obj.sold),
      earned: new BN(obj.earned),
      collectors: new BN(obj.collectors),
    })
  }

  toEncodable() {
    return SaleTrack.toEncodable(this)
  }
}
