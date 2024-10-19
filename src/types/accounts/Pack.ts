import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PackFields {
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
  count: BN
  live: BN
  available: BN
  printed: BN
  saleConfig: types.SaleConfigFields
  opened: BN
  owed: BN
  identifier: BN
  hash: BN
  hashTraits: BN
  packConfig: types.PackConfigFields
  volume: Array<types.FakeVolumeTrackFields>
  delegate: Array<PublicKey>
  extra: Array<number>
}

export interface PackJSON {
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
  count: string
  live: string
  available: string
  printed: string
  saleConfig: types.SaleConfigJSON
  opened: string
  owed: string
  identifier: string
  hash: string
  hashTraits: string
  packConfig: types.PackConfigJSON
  volume: Array<types.FakeVolumeTrackJSON>
  delegate: Array<string>
  extra: Array<number>
}

export class Pack {
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
  readonly count: BN
  readonly live: BN
  readonly available: BN
  readonly printed: BN
  readonly saleConfig: types.SaleConfig
  readonly opened: BN
  readonly owed: BN
  readonly identifier: BN
  readonly hash: BN
  readonly hashTraits: BN
  readonly packConfig: types.PackConfig
  readonly volume: Array<types.FakeVolumeTrack>
  readonly delegate: Array<PublicKey>
  readonly extra: Array<number>

  static readonly discriminator = Buffer.from([
    244, 192, 97, 212, 134, 91, 198, 200,
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
    borsh.u64("count"),
    borsh.u64("live"),
    borsh.u64("available"),
    borsh.u64("printed"),
    types.SaleConfig.layout("saleConfig"),
    borsh.u64("opened"),
    borsh.u64("owed"),
    borsh.u64("identifier"),
    borsh.u64("hash"),
    borsh.u64("hashTraits"),
    types.PackConfig.layout("packConfig"),
    borsh.vec(types.FakeVolumeTrack.layout(), "volume"),
    borsh.vec(borsh.publicKey(), "delegate"),
    borsh.array(borsh.u8(), 4, "extra"),
  ])

  constructor(fields: PackFields) {
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
    this.count = fields.count
    this.live = fields.live
    this.available = fields.available
    this.printed = fields.printed
    this.saleConfig = new types.SaleConfig({ ...fields.saleConfig })
    this.opened = fields.opened
    this.owed = fields.owed
    this.identifier = fields.identifier
    this.hash = fields.hash
    this.hashTraits = fields.hashTraits
    this.packConfig = new types.PackConfig({ ...fields.packConfig })
    this.volume = fields.volume.map(
      (item) => new types.FakeVolumeTrack({ ...item })
    )
    this.delegate = fields.delegate
    this.extra = fields.extra
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Pack | null> {
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
  ): Promise<Array<Pack | null>> {
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

  static decode(data: Buffer): Pack {
    if (!data.slice(0, 8).equals(Pack.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Pack.layout.decode(data.slice(8))

    return new Pack({
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
      count: dec.count,
      live: dec.live,
      available: dec.available,
      printed: dec.printed,
      saleConfig: types.SaleConfig.fromDecoded(dec.saleConfig),
      opened: dec.opened,
      owed: dec.owed,
      identifier: dec.identifier,
      hash: dec.hash,
      hashTraits: dec.hashTraits,
      packConfig: types.PackConfig.fromDecoded(dec.packConfig),
      volume: dec.volume.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.FakeVolumeTrack.fromDecoded(item)
      ),
      delegate: dec.delegate,
      extra: dec.extra,
    })
  }

  toJSON(): PackJSON {
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
      count: this.count.toString(),
      live: this.live.toString(),
      available: this.available.toString(),
      printed: this.printed.toString(),
      saleConfig: this.saleConfig.toJSON(),
      opened: this.opened.toString(),
      owed: this.owed.toString(),
      identifier: this.identifier.toString(),
      hash: this.hash.toString(),
      hashTraits: this.hashTraits.toString(),
      packConfig: this.packConfig.toJSON(),
      volume: this.volume.map((item) => item.toJSON()),
      delegate: this.delegate.map((item) => item.toString()),
      extra: this.extra,
    }
  }

  static fromJSON(obj: PackJSON): Pack {
    return new Pack({
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
      count: new BN(obj.count),
      live: new BN(obj.live),
      available: new BN(obj.available),
      printed: new BN(obj.printed),
      saleConfig: types.SaleConfig.fromJSON(obj.saleConfig),
      opened: new BN(obj.opened),
      owed: new BN(obj.owed),
      identifier: new BN(obj.identifier),
      hash: new BN(obj.hash),
      hashTraits: new BN(obj.hashTraits),
      packConfig: types.PackConfig.fromJSON(obj.packConfig),
      volume: obj.volume.map((item) => types.FakeVolumeTrack.fromJSON(item)),
      delegate: obj.delegate.map((item) => new PublicKey(item)),
      extra: obj.extra,
    })
  }
}
