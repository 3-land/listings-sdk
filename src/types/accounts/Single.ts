import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SingleFields {
  class: types.AccountClassKind
  globalState: types.GlobalStateKind
  holder: PublicKey
  creator: PublicKey
  createdHour: number
  createdDates: types.IndexDateNoHourFields
  activityHour: number
  activityDates: types.IndexDateNoHourFields
  category: types.CategoryFields
  superCategory: types.SuperCategoryFields
  eventCategory: number
  trackType: types.TrackRegistryKind
  mainCurrencyHash: BN
  state: types.ItemStateKind
  supply: BN
  createdPieces: BN
  popularity: types.PopularityFields
  filtering: types.FilterFields
  page: BN
  manager: PublicKey
  extra: Array<number>
  item: types.ItemFields
  saleConfig: types.SaleConfigFields
  identifier: BN
  hash: BN
  hashTraits: BN
  volume: Array<types.FakeVolumeTrackFields>
}

export interface SingleJSON {
  class: types.AccountClassJSON
  globalState: types.GlobalStateJSON
  holder: string
  creator: string
  createdHour: number
  createdDates: types.IndexDateNoHourJSON
  activityHour: number
  activityDates: types.IndexDateNoHourJSON
  category: types.CategoryJSON
  superCategory: types.SuperCategoryJSON
  eventCategory: number
  trackType: types.TrackRegistryJSON
  mainCurrencyHash: string
  state: types.ItemStateJSON
  supply: string
  createdPieces: string
  popularity: types.PopularityJSON
  filtering: types.FilterJSON
  page: string
  manager: string
  extra: Array<number>
  item: types.ItemJSON
  saleConfig: types.SaleConfigJSON
  identifier: string
  hash: string
  hashTraits: string
  volume: Array<types.FakeVolumeTrackJSON>
}

export class Single {
  readonly class: types.AccountClassKind
  readonly globalState: types.GlobalStateKind
  readonly holder: PublicKey
  readonly creator: PublicKey
  readonly createdHour: number
  readonly createdDates: types.IndexDateNoHour
  readonly activityHour: number
  readonly activityDates: types.IndexDateNoHour
  readonly category: types.Category
  readonly superCategory: types.SuperCategory
  readonly eventCategory: number
  readonly trackType: types.TrackRegistryKind
  readonly mainCurrencyHash: BN
  readonly state: types.ItemStateKind
  readonly supply: BN
  readonly createdPieces: BN
  readonly popularity: types.Popularity
  readonly filtering: types.Filter
  readonly page: BN
  readonly manager: PublicKey
  readonly extra: Array<number>
  readonly item: types.Item
  readonly saleConfig: types.SaleConfig
  readonly identifier: BN
  readonly hash: BN
  readonly hashTraits: BN
  readonly volume: Array<types.FakeVolumeTrack>

  static readonly discriminator = Buffer.from([23, 154, 0, 26, 73, 227, 49, 70])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.GlobalState.layout("globalState"),
    borsh.publicKey("holder"),
    borsh.publicKey("creator"),
    borsh.u32("createdHour"),
    types.IndexDateNoHour.layout("createdDates"),
    borsh.u32("activityHour"),
    types.IndexDateNoHour.layout("activityDates"),
    types.Category.layout("category"),
    types.SuperCategory.layout("superCategory"),
    borsh.u16("eventCategory"),
    types.TrackRegistry.layout("trackType"),
    borsh.u64("mainCurrencyHash"),
    types.ItemState.layout("state"),
    borsh.u64("supply"),
    borsh.u64("createdPieces"),
    types.Popularity.layout("popularity"),
    types.Filter.layout("filtering"),
    borsh.u64("page"),
    borsh.publicKey("manager"),
    borsh.array(borsh.u8(), 8, "extra"),
    types.Item.layout("item"),
    types.SaleConfig.layout("saleConfig"),
    borsh.u64("identifier"),
    borsh.u64("hash"),
    borsh.u64("hashTraits"),
    borsh.vec(types.FakeVolumeTrack.layout(), "volume"),
  ])

  constructor(fields: SingleFields) {
    this.class = fields.class
    this.globalState = fields.globalState
    this.holder = fields.holder
    this.creator = fields.creator
    this.createdHour = fields.createdHour
    this.createdDates = new types.IndexDateNoHour({ ...fields.createdDates })
    this.activityHour = fields.activityHour
    this.activityDates = new types.IndexDateNoHour({ ...fields.activityDates })
    this.category = new types.Category({ ...fields.category })
    this.superCategory = new types.SuperCategory({ ...fields.superCategory })
    this.eventCategory = fields.eventCategory
    this.trackType = fields.trackType
    this.mainCurrencyHash = fields.mainCurrencyHash
    this.state = fields.state
    this.supply = fields.supply
    this.createdPieces = fields.createdPieces
    this.popularity = new types.Popularity({ ...fields.popularity })
    this.filtering = new types.Filter({ ...fields.filtering })
    this.page = fields.page
    this.manager = fields.manager
    this.extra = fields.extra
    this.item = new types.Item({ ...fields.item })
    this.saleConfig = new types.SaleConfig({ ...fields.saleConfig })
    this.identifier = fields.identifier
    this.hash = fields.hash
    this.hashTraits = fields.hashTraits
    this.volume = fields.volume.map(
      (item) => new types.FakeVolumeTrack({ ...item })
    )
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Single | null> {
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
  ): Promise<Array<Single | null>> {
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

  static decode(data: Buffer): Single {
    if (!data.slice(0, 8).equals(Single.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Single.layout.decode(data.slice(8))

    return new Single({
      class: types.AccountClass.fromDecoded(dec.class),
      globalState: types.GlobalState.fromDecoded(dec.globalState),
      holder: dec.holder,
      creator: dec.creator,
      createdHour: dec.createdHour,
      createdDates: types.IndexDateNoHour.fromDecoded(dec.createdDates),
      activityHour: dec.activityHour,
      activityDates: types.IndexDateNoHour.fromDecoded(dec.activityDates),
      category: types.Category.fromDecoded(dec.category),
      superCategory: types.SuperCategory.fromDecoded(dec.superCategory),
      eventCategory: dec.eventCategory,
      trackType: types.TrackRegistry.fromDecoded(dec.trackType),
      mainCurrencyHash: dec.mainCurrencyHash,
      state: types.ItemState.fromDecoded(dec.state),
      supply: dec.supply,
      createdPieces: dec.createdPieces,
      popularity: types.Popularity.fromDecoded(dec.popularity),
      filtering: types.Filter.fromDecoded(dec.filtering),
      page: dec.page,
      manager: dec.manager,
      extra: dec.extra,
      item: types.Item.fromDecoded(dec.item),
      saleConfig: types.SaleConfig.fromDecoded(dec.saleConfig),
      identifier: dec.identifier,
      hash: dec.hash,
      hashTraits: dec.hashTraits,
      volume: dec.volume.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.FakeVolumeTrack.fromDecoded(item)
      ),
    })
  }

  toJSON(): SingleJSON {
    return {
      class: this.class.toJSON(),
      globalState: this.globalState.toJSON(),
      holder: this.holder.toString(),
      creator: this.creator.toString(),
      createdHour: this.createdHour,
      createdDates: this.createdDates.toJSON(),
      activityHour: this.activityHour,
      activityDates: this.activityDates.toJSON(),
      category: this.category.toJSON(),
      superCategory: this.superCategory.toJSON(),
      eventCategory: this.eventCategory,
      trackType: this.trackType.toJSON(),
      mainCurrencyHash: this.mainCurrencyHash.toString(),
      state: this.state.toJSON(),
      supply: this.supply.toString(),
      createdPieces: this.createdPieces.toString(),
      popularity: this.popularity.toJSON(),
      filtering: this.filtering.toJSON(),
      page: this.page.toString(),
      manager: this.manager.toString(),
      extra: this.extra,
      item: this.item.toJSON(),
      saleConfig: this.saleConfig.toJSON(),
      identifier: this.identifier.toString(),
      hash: this.hash.toString(),
      hashTraits: this.hashTraits.toString(),
      volume: this.volume.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: SingleJSON): Single {
    return new Single({
      class: types.AccountClass.fromJSON(obj.class),
      globalState: types.GlobalState.fromJSON(obj.globalState),
      holder: new PublicKey(obj.holder),
      creator: new PublicKey(obj.creator),
      createdHour: obj.createdHour,
      createdDates: types.IndexDateNoHour.fromJSON(obj.createdDates),
      activityHour: obj.activityHour,
      activityDates: types.IndexDateNoHour.fromJSON(obj.activityDates),
      category: types.Category.fromJSON(obj.category),
      superCategory: types.SuperCategory.fromJSON(obj.superCategory),
      eventCategory: obj.eventCategory,
      trackType: types.TrackRegistry.fromJSON(obj.trackType),
      mainCurrencyHash: new BN(obj.mainCurrencyHash),
      state: types.ItemState.fromJSON(obj.state),
      supply: new BN(obj.supply),
      createdPieces: new BN(obj.createdPieces),
      popularity: types.Popularity.fromJSON(obj.popularity),
      filtering: types.Filter.fromJSON(obj.filtering),
      page: new BN(obj.page),
      manager: new PublicKey(obj.manager),
      extra: obj.extra,
      item: types.Item.fromJSON(obj.item),
      saleConfig: types.SaleConfig.fromJSON(obj.saleConfig),
      identifier: new BN(obj.identifier),
      hash: new BN(obj.hash),
      hashTraits: new BN(obj.hashTraits),
      volume: obj.volume.map((item) => types.FakeVolumeTrack.fromJSON(item)),
    })
  }
}
