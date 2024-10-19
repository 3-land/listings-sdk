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
  dates: types.IndexDatesFields
  category: types.CategoryFields
  superCategory: types.SuperCategoryFields
  eventCategory: number
  trackType: types.TrackRegistryKind
  mainCurrencyHash: BN
  track: types.ItemTrackFields
  popularity: types.PopularityFields
  filtering: types.FilterFields
  page: BN
  manager: PublicKey
  isServerless: number
  availableOption: number
  hasWrappedTokens: number
  burntPieces: number
  flag: Array<number>
  item: types.ItemFields
  saleConfig: types.SaleConfigFields
  identifier: BN
  hash: BN
  hashTraits: BN
  volume: Array<types.FakeVolumeTrackFields>
  extra: Array<number>
}

export interface SingleJSON {
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
  track: types.ItemTrackJSON
  popularity: types.PopularityJSON
  filtering: types.FilterJSON
  page: string
  manager: string
  isServerless: number
  availableOption: number
  hasWrappedTokens: number
  burntPieces: number
  flag: Array<number>
  item: types.ItemJSON
  saleConfig: types.SaleConfigJSON
  identifier: string
  hash: string
  hashTraits: string
  volume: Array<types.FakeVolumeTrackJSON>
  extra: Array<number>
}

export class Single {
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
  readonly track: types.ItemTrack
  readonly popularity: types.Popularity
  readonly filtering: types.Filter
  readonly page: BN
  readonly manager: PublicKey
  readonly isServerless: number
  readonly availableOption: number
  readonly hasWrappedTokens: number
  readonly burntPieces: number
  readonly flag: Array<number>
  readonly item: types.Item
  readonly saleConfig: types.SaleConfig
  readonly identifier: BN
  readonly hash: BN
  readonly hashTraits: BN
  readonly volume: Array<types.FakeVolumeTrack>
  readonly extra: Array<number>

  static readonly discriminator = Buffer.from([23, 154, 0, 26, 73, 227, 49, 70])

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
    types.ItemTrack.layout("track"),
    types.Popularity.layout("popularity"),
    types.Filter.layout("filtering"),
    borsh.u64("page"),
    borsh.publicKey("manager"),
    borsh.u8("isServerless"),
    borsh.u8("availableOption"),
    borsh.u8("hasWrappedTokens"),
    borsh.u32("burntPieces"),
    borsh.array(borsh.u8(), 1, "flag"),
    types.Item.layout("item"),
    types.SaleConfig.layout("saleConfig"),
    borsh.u64("identifier"),
    borsh.u64("hash"),
    borsh.u64("hashTraits"),
    borsh.vec(types.FakeVolumeTrack.layout(), "volume"),
    borsh.array(borsh.u8(), 4, "extra"),
  ])

  constructor(fields: SingleFields) {
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
    this.track = new types.ItemTrack({ ...fields.track })
    this.popularity = new types.Popularity({ ...fields.popularity })
    this.filtering = new types.Filter({ ...fields.filtering })
    this.page = fields.page
    this.manager = fields.manager
    this.isServerless = fields.isServerless
    this.availableOption = fields.availableOption
    this.hasWrappedTokens = fields.hasWrappedTokens
    this.burntPieces = fields.burntPieces
    this.flag = fields.flag
    this.item = new types.Item({ ...fields.item })
    this.saleConfig = new types.SaleConfig({ ...fields.saleConfig })
    this.identifier = fields.identifier
    this.hash = fields.hash
    this.hashTraits = fields.hashTraits
    this.volume = fields.volume.map(
      (item) => new types.FakeVolumeTrack({ ...item })
    )
    this.extra = fields.extra
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
      dates: types.IndexDates.fromDecoded(dec.dates),
      category: types.Category.fromDecoded(dec.category),
      superCategory: types.SuperCategory.fromDecoded(dec.superCategory),
      eventCategory: dec.eventCategory,
      trackType: types.TrackRegistry.fromDecoded(dec.trackType),
      mainCurrencyHash: dec.mainCurrencyHash,
      track: types.ItemTrack.fromDecoded(dec.track),
      popularity: types.Popularity.fromDecoded(dec.popularity),
      filtering: types.Filter.fromDecoded(dec.filtering),
      page: dec.page,
      manager: dec.manager,
      isServerless: dec.isServerless,
      availableOption: dec.availableOption,
      hasWrappedTokens: dec.hasWrappedTokens,
      burntPieces: dec.burntPieces,
      flag: dec.flag,
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
      extra: dec.extra,
    })
  }

  toJSON(): SingleJSON {
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
      track: this.track.toJSON(),
      popularity: this.popularity.toJSON(),
      filtering: this.filtering.toJSON(),
      page: this.page.toString(),
      manager: this.manager.toString(),
      isServerless: this.isServerless,
      availableOption: this.availableOption,
      hasWrappedTokens: this.hasWrappedTokens,
      burntPieces: this.burntPieces,
      flag: this.flag,
      item: this.item.toJSON(),
      saleConfig: this.saleConfig.toJSON(),
      identifier: this.identifier.toString(),
      hash: this.hash.toString(),
      hashTraits: this.hashTraits.toString(),
      volume: this.volume.map((item) => item.toJSON()),
      extra: this.extra,
    }
  }

  static fromJSON(obj: SingleJSON): Single {
    return new Single({
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
      track: types.ItemTrack.fromJSON(obj.track),
      popularity: types.Popularity.fromJSON(obj.popularity),
      filtering: types.Filter.fromJSON(obj.filtering),
      page: new BN(obj.page),
      manager: new PublicKey(obj.manager),
      isServerless: obj.isServerless,
      availableOption: obj.availableOption,
      hasWrappedTokens: obj.hasWrappedTokens,
      burntPieces: obj.burntPieces,
      flag: obj.flag,
      item: types.Item.fromJSON(obj.item),
      saleConfig: types.SaleConfig.fromJSON(obj.saleConfig),
      identifier: new BN(obj.identifier),
      hash: new BN(obj.hash),
      hashTraits: new BN(obj.hashTraits),
      volume: obj.volume.map((item) => types.FakeVolumeTrack.fromJSON(item)),
      extra: obj.extra,
    })
  }
}
