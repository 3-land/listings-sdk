import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ItemArchiveFields {
  class: types.AccountClassKind
  globalState: types.GlobalStateKind
  holder: PublicKey
  creator: PublicKey
  dates: types.IndexDatesFields
  category: types.CategoryFields
  superCategory: types.SuperCategoryFields
  eventCategory: number
  trackType: types.TrackRegistryKind
  mainCurrencyHash: BN
  state: types.ItemStateKind
  collection: PublicKey
  cnft: PublicKey
  identifier: BN
  hash: BN
  supply: BN
  volume: Array<types.FakeVolumeTrackFields>
}

export interface ItemArchiveJSON {
  class: types.AccountClassJSON
  globalState: types.GlobalStateJSON
  holder: string
  creator: string
  dates: types.IndexDatesJSON
  category: types.CategoryJSON
  superCategory: types.SuperCategoryJSON
  eventCategory: number
  trackType: types.TrackRegistryJSON
  mainCurrencyHash: string
  state: types.ItemStateJSON
  collection: string
  cnft: string
  identifier: string
  hash: string
  supply: string
  volume: Array<types.FakeVolumeTrackJSON>
}

export class ItemArchive {
  readonly class: types.AccountClassKind
  readonly globalState: types.GlobalStateKind
  readonly holder: PublicKey
  readonly creator: PublicKey
  readonly dates: types.IndexDates
  readonly category: types.Category
  readonly superCategory: types.SuperCategory
  readonly eventCategory: number
  readonly trackType: types.TrackRegistryKind
  readonly mainCurrencyHash: BN
  readonly state: types.ItemStateKind
  readonly collection: PublicKey
  readonly cnft: PublicKey
  readonly identifier: BN
  readonly hash: BN
  readonly supply: BN
  readonly volume: Array<types.FakeVolumeTrack>

  static readonly discriminator = Buffer.from([
    11, 87, 59, 106, 157, 209, 221, 195,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.GlobalState.layout("globalState"),
    borsh.publicKey("holder"),
    borsh.publicKey("creator"),
    types.IndexDates.layout("dates"),
    types.Category.layout("category"),
    types.SuperCategory.layout("superCategory"),
    borsh.u16("eventCategory"),
    types.TrackRegistry.layout("trackType"),
    borsh.u64("mainCurrencyHash"),
    types.ItemState.layout("state"),
    borsh.publicKey("collection"),
    borsh.publicKey("cnft"),
    borsh.u64("identifier"),
    borsh.u64("hash"),
    borsh.u64("supply"),
    borsh.vec(types.FakeVolumeTrack.layout(), "volume"),
  ])

  constructor(fields: ItemArchiveFields) {
    this.class = fields.class
    this.globalState = fields.globalState
    this.holder = fields.holder
    this.creator = fields.creator
    this.dates = new types.IndexDates({ ...fields.dates })
    this.category = new types.Category({ ...fields.category })
    this.superCategory = new types.SuperCategory({ ...fields.superCategory })
    this.eventCategory = fields.eventCategory
    this.trackType = fields.trackType
    this.mainCurrencyHash = fields.mainCurrencyHash
    this.state = fields.state
    this.collection = fields.collection
    this.cnft = fields.cnft
    this.identifier = fields.identifier
    this.hash = fields.hash
    this.supply = fields.supply
    this.volume = fields.volume.map(
      (item) => new types.FakeVolumeTrack({ ...item })
    )
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ItemArchive | null> {
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
  ): Promise<Array<ItemArchive | null>> {
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

  static decode(data: Buffer): ItemArchive {
    if (!data.slice(0, 8).equals(ItemArchive.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ItemArchive.layout.decode(data.slice(8))

    return new ItemArchive({
      class: types.AccountClass.fromDecoded(dec.class),
      globalState: types.GlobalState.fromDecoded(dec.globalState),
      holder: dec.holder,
      creator: dec.creator,
      dates: types.IndexDates.fromDecoded(dec.dates),
      category: types.Category.fromDecoded(dec.category),
      superCategory: types.SuperCategory.fromDecoded(dec.superCategory),
      eventCategory: dec.eventCategory,
      trackType: types.TrackRegistry.fromDecoded(dec.trackType),
      mainCurrencyHash: dec.mainCurrencyHash,
      state: types.ItemState.fromDecoded(dec.state),
      collection: dec.collection,
      cnft: dec.cnft,
      identifier: dec.identifier,
      hash: dec.hash,
      supply: dec.supply,
      volume: dec.volume.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.FakeVolumeTrack.fromDecoded(item)
      ),
    })
  }

  toJSON(): ItemArchiveJSON {
    return {
      class: this.class.toJSON(),
      globalState: this.globalState.toJSON(),
      holder: this.holder.toString(),
      creator: this.creator.toString(),
      dates: this.dates.toJSON(),
      category: this.category.toJSON(),
      superCategory: this.superCategory.toJSON(),
      eventCategory: this.eventCategory,
      trackType: this.trackType.toJSON(),
      mainCurrencyHash: this.mainCurrencyHash.toString(),
      state: this.state.toJSON(),
      collection: this.collection.toString(),
      cnft: this.cnft.toString(),
      identifier: this.identifier.toString(),
      hash: this.hash.toString(),
      supply: this.supply.toString(),
      volume: this.volume.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: ItemArchiveJSON): ItemArchive {
    return new ItemArchive({
      class: types.AccountClass.fromJSON(obj.class),
      globalState: types.GlobalState.fromJSON(obj.globalState),
      holder: new PublicKey(obj.holder),
      creator: new PublicKey(obj.creator),
      dates: types.IndexDates.fromJSON(obj.dates),
      category: types.Category.fromJSON(obj.category),
      superCategory: types.SuperCategory.fromJSON(obj.superCategory),
      eventCategory: obj.eventCategory,
      trackType: types.TrackRegistry.fromJSON(obj.trackType),
      mainCurrencyHash: new BN(obj.mainCurrencyHash),
      state: types.ItemState.fromJSON(obj.state),
      collection: new PublicKey(obj.collection),
      cnft: new PublicKey(obj.cnft),
      identifier: new BN(obj.identifier),
      hash: new BN(obj.hash),
      supply: new BN(obj.supply),
      volume: obj.volume.map((item) => types.FakeVolumeTrack.fromJSON(item)),
    })
  }
}
