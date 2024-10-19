import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreatorRegistryFields {
  class: types.AccountClassKind
  storeHash: BN
  currency: PublicKey
  creator: PublicKey
  donations: BN
  date: types.IndexDateFields
  filters: Array<number>
  track: types.SaleTrackFields
  lut: PublicKey
}

export interface CreatorRegistryJSON {
  class: types.AccountClassJSON
  storeHash: string
  currency: string
  creator: string
  donations: string
  date: types.IndexDateJSON
  filters: Array<number>
  track: types.SaleTrackJSON
  lut: string
}

export class CreatorRegistry {
  readonly class: types.AccountClassKind
  readonly storeHash: BN
  readonly currency: PublicKey
  readonly creator: PublicKey
  readonly donations: BN
  readonly date: types.IndexDate
  readonly filters: Array<number>
  readonly track: types.SaleTrack
  readonly lut: PublicKey

  static readonly discriminator = Buffer.from([
    14, 189, 133, 111, 190, 233, 2, 236,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("storeHash"),
    borsh.publicKey("currency"),
    borsh.publicKey("creator"),
    borsh.u64("donations"),
    types.IndexDate.layout("date"),
    borsh.array(borsh.u8(), 8, "filters"),
    types.SaleTrack.layout("track"),
    borsh.publicKey("lut"),
  ])

  constructor(fields: CreatorRegistryFields) {
    this.class = fields.class
    this.storeHash = fields.storeHash
    this.currency = fields.currency
    this.creator = fields.creator
    this.donations = fields.donations
    this.date = new types.IndexDate({ ...fields.date })
    this.filters = fields.filters
    this.track = new types.SaleTrack({ ...fields.track })
    this.lut = fields.lut
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<CreatorRegistry | null> {
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
  ): Promise<Array<CreatorRegistry | null>> {
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

  static decode(data: Buffer): CreatorRegistry {
    if (!data.slice(0, 8).equals(CreatorRegistry.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = CreatorRegistry.layout.decode(data.slice(8))

    return new CreatorRegistry({
      class: types.AccountClass.fromDecoded(dec.class),
      storeHash: dec.storeHash,
      currency: dec.currency,
      creator: dec.creator,
      donations: dec.donations,
      date: types.IndexDate.fromDecoded(dec.date),
      filters: dec.filters,
      track: types.SaleTrack.fromDecoded(dec.track),
      lut: dec.lut,
    })
  }

  toJSON(): CreatorRegistryJSON {
    return {
      class: this.class.toJSON(),
      storeHash: this.storeHash.toString(),
      currency: this.currency.toString(),
      creator: this.creator.toString(),
      donations: this.donations.toString(),
      date: this.date.toJSON(),
      filters: this.filters,
      track: this.track.toJSON(),
      lut: this.lut.toString(),
    }
  }

  static fromJSON(obj: CreatorRegistryJSON): CreatorRegistry {
    return new CreatorRegistry({
      class: types.AccountClass.fromJSON(obj.class),
      storeHash: new BN(obj.storeHash),
      currency: new PublicKey(obj.currency),
      creator: new PublicKey(obj.creator),
      donations: new BN(obj.donations),
      date: types.IndexDate.fromJSON(obj.date),
      filters: obj.filters,
      track: types.SaleTrack.fromJSON(obj.track),
      lut: new PublicKey(obj.lut),
    })
  }
}
