import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IndexDatesFields {
  created: types.IndexDateFields
  activity: types.IndexDateFields
}

export interface IndexDatesJSON {
  created: types.IndexDateJSON
  activity: types.IndexDateJSON
}

export class IndexDates {
  readonly created: types.IndexDate
  readonly activity: types.IndexDate

  constructor(fields: IndexDatesFields) {
    this.created = new types.IndexDate({ ...fields.created })
    this.activity = new types.IndexDate({ ...fields.activity })
  }

  static layout(property?: string) {
    return borsh.struct(
      [types.IndexDate.layout("created"), types.IndexDate.layout("activity")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IndexDates({
      created: types.IndexDate.fromDecoded(obj.created),
      activity: types.IndexDate.fromDecoded(obj.activity),
    })
  }

  static toEncodable(fields: IndexDatesFields) {
    return {
      created: types.IndexDate.toEncodable(fields.created),
      activity: types.IndexDate.toEncodable(fields.activity),
    }
  }

  toJSON(): IndexDatesJSON {
    return {
      created: this.created.toJSON(),
      activity: this.activity.toJSON(),
    }
  }

  static fromJSON(obj: IndexDatesJSON): IndexDates {
    return new IndexDates({
      created: types.IndexDate.fromJSON(obj.created),
      activity: types.IndexDate.fromJSON(obj.activity),
    })
  }

  toEncodable() {
    return IndexDates.toEncodable(this)
  }
}
