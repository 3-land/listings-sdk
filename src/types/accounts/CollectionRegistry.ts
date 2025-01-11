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
  created: BN
  sold: BN
  earned: BN
  collectors: BN
}

export interface CollectionRegistryJSON {
  class: types.AccountClassJSON
  storeHash: string
  currency: string
  collection: string
  donations: string
  date: types.IndexDateJSON
  filters: Array<number>
  created: string
  sold: string
  earned: string
  collectors: string
}

export class CollectionRegistry {
  readonly class: types.AccountClassKind
  readonly storeHash: BN
  readonly currency: PublicKey
  readonly collection: PublicKey
  readonly donations: BN
  readonly date: types.IndexDate
  readonly filters: Array<number>
  readonly created: BN
  readonly sold: BN
  readonly earned: BN
  readonly collectors: BN

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
    borsh.u64("created"),
    borsh.u64("sold"),
    borsh.u64("earned"),
    borsh.u64("collectors"),
  ])

  constructor(fields: CollectionRegistryFields) {
    this.class = fields.class
    this.storeHash = fields.storeHash
    this.currency = fields.currency
    this.collection = fields.collection
    this.donations = fields.donations
    this.date = new types.IndexDate({ ...fields.date })
    this.filters = fields.filters
    this.created = fields.created
    this.sold = fields.sold
    this.earned = fields.earned
    this.collectors = fields.collectors
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
      created: dec.created,
      sold: dec.sold,
      earned: dec.earned,
      collectors: dec.collectors,
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
      created: this.created.toString(),
      sold: this.sold.toString(),
      earned: this.earned.toString(),
      collectors: this.collectors.toString(),
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
      created: new BN(obj.created),
      sold: new BN(obj.sold),
      earned: new BN(obj.earned),
      collectors: new BN(obj.collectors),
    })
  }
}
