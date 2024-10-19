import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CollectionRegistryFields {
  class: types.AccountClassKind
  storeHash: BN
  currency: PublicKey
  collection: PublicKey
  donations: BN
  date: types.IndexDateFields
  filters: Array<number>
  track: types.SaleTrackFields
}

export interface CollectionRegistryJSON {
  class: types.AccountClassJSON
  storeHash: string
  currency: string
  collection: string
  donations: string
  date: types.IndexDateJSON
  filters: Array<number>
  track: types.SaleTrackJSON
}

export class CollectionRegistry {
  readonly class: types.AccountClassKind
  readonly storeHash: BN
  readonly currency: PublicKey
  readonly collection: PublicKey
  readonly donations: BN
  readonly date: types.IndexDate
  readonly filters: Array<number>
  readonly track: types.SaleTrack

  static readonly discriminator = Buffer.from([
    103, 157, 231, 9, 181, 43, 15, 106,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("storeHash"),
    borsh.publicKey("currency"),
    borsh.publicKey("collection"),
    borsh.u64("donations"),
    types.IndexDate.layout("date"),
    borsh.array(borsh.u8(), 8, "filters"),
    types.SaleTrack.layout("track"),
  ])

  constructor(fields: CollectionRegistryFields) {
    this.class = fields.class
    this.storeHash = fields.storeHash
    this.currency = fields.currency
    this.collection = fields.collection
    this.donations = fields.donations
    this.date = new types.IndexDate({ ...fields.date })
    this.filters = fields.filters
    this.track = new types.SaleTrack({ ...fields.track })
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<CollectionRegistry | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<CollectionRegistry | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): CollectionRegistry {
    if (!data.slice(0, 8).equals(CollectionRegistry.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = CollectionRegistry.layout.decode(data.slice(8))

    return new CollectionRegistry({
      class: types.AccountClass.fromDecoded(dec.class),
      storeHash: dec.storeHash,
      currency: dec.currency,
      collection: dec.collection,
      donations: dec.donations,
      date: types.IndexDate.fromDecoded(dec.date),
      filters: dec.filters,
      track: types.SaleTrack.fromDecoded(dec.track),
    })
  }

  toJSON(): CollectionRegistryJSON {
    return {
      class: this.class.toJSON(),
      storeHash: this.storeHash.toString(),
      currency: this.currency.toString(),
      collection: this.collection.toString(),
      donations: this.donations.toString(),
      date: this.date.toJSON(),
      filters: this.filters,
      track: this.track.toJSON(),
    }
  }

  static fromJSON(obj: CollectionRegistryJSON): CollectionRegistry {
    return new CollectionRegistry({
      class: types.AccountClass.fromJSON(obj.class),
      storeHash: new BN(obj.storeHash),
      currency: new PublicKey(obj.currency),
      collection: new PublicKey(obj.collection),
      donations: new BN(obj.donations),
      date: types.IndexDate.fromJSON(obj.date),
      filters: obj.filters,
      track: types.SaleTrack.fromJSON(obj.track),
    })
  }
}
