import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ArchiveDepositFields {
  class: types.AccountClassKind
  identifier: BN
  creator: PublicKey
  dates: types.IndexDatesFields
  holder: PublicKey
  category: types.CategoryFields
  superCategory: types.SuperCategoryFields
  eventCategory: number
  hash: BN
  manager: PublicKey
  metadata: types.MetadataArgsFields
  supply: BN
  trackType: types.TrackRegistryKind
  mainCurrencyHash: BN
  volume: Array<types.FakeVolumeTrackFields>
}

export interface ArchiveDepositJSON {
  class: types.AccountClassJSON
  identifier: string
  creator: string
  dates: types.IndexDatesJSON
  holder: string
  category: types.CategoryJSON
  superCategory: types.SuperCategoryJSON
  eventCategory: number
  hash: string
  manager: string
  metadata: types.MetadataArgsJSON
  supply: string
  trackType: types.TrackRegistryJSON
  mainCurrencyHash: string
  volume: Array<types.FakeVolumeTrackJSON>
}

export class ArchiveDeposit {
  readonly class: types.AccountClassKind
  readonly identifier: BN
  readonly creator: PublicKey
  readonly dates: types.IndexDates
  readonly holder: PublicKey
  readonly category: types.Category
  readonly superCategory: types.SuperCategory
  readonly eventCategory: number
  readonly hash: BN
  readonly manager: PublicKey
  readonly metadata: types.MetadataArgs
  readonly supply: BN
  readonly trackType: types.TrackRegistryKind
  readonly mainCurrencyHash: BN
  readonly volume: Array<types.FakeVolumeTrack>

  static readonly discriminator = Buffer.from([
    145, 231, 133, 253, 101, 203, 61, 166,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("identifier"),
    borsh.publicKey("creator"),
    types.IndexDates.layout("dates"),
    borsh.publicKey("holder"),
    types.Category.layout("category"),
    types.SuperCategory.layout("superCategory"),
    borsh.u16("eventCategory"),
    borsh.u64("hash"),
    borsh.publicKey("manager"),
    types.MetadataArgs.layout("metadata"),
    borsh.u64("supply"),
    types.TrackRegistry.layout("trackType"),
    borsh.u64("mainCurrencyHash"),
    borsh.vec(types.FakeVolumeTrack.layout(), "volume"),
  ])

  constructor(fields: ArchiveDepositFields) {
    this.class = fields.class
    this.identifier = fields.identifier
    this.creator = fields.creator
    this.dates = new types.IndexDates({ ...fields.dates })
    this.holder = fields.holder
    this.category = new types.Category({ ...fields.category })
    this.superCategory = new types.SuperCategory({ ...fields.superCategory })
    this.eventCategory = fields.eventCategory
    this.hash = fields.hash
    this.manager = fields.manager
    this.metadata = new types.MetadataArgs({ ...fields.metadata })
    this.supply = fields.supply
    this.trackType = fields.trackType
    this.mainCurrencyHash = fields.mainCurrencyHash
    this.volume = fields.volume.map(
      (item) => new types.FakeVolumeTrack({ ...item })
    )
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ArchiveDeposit | null> {
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
  ): Promise<Array<ArchiveDeposit | null>> {
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

  static decode(data: Buffer): ArchiveDeposit {
    if (!data.slice(0, 8).equals(ArchiveDeposit.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ArchiveDeposit.layout.decode(data.slice(8))

    return new ArchiveDeposit({
      class: types.AccountClass.fromDecoded(dec.class),
      identifier: dec.identifier,
      creator: dec.creator,
      dates: types.IndexDates.fromDecoded(dec.dates),
      holder: dec.holder,
      category: types.Category.fromDecoded(dec.category),
      superCategory: types.SuperCategory.fromDecoded(dec.superCategory),
      eventCategory: dec.eventCategory,
      hash: dec.hash,
      manager: dec.manager,
      metadata: types.MetadataArgs.fromDecoded(dec.metadata),
      supply: dec.supply,
      trackType: types.TrackRegistry.fromDecoded(dec.trackType),
      mainCurrencyHash: dec.mainCurrencyHash,
      volume: dec.volume.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.FakeVolumeTrack.fromDecoded(item)
      ),
    })
  }

  toJSON(): ArchiveDepositJSON {
    return {
      class: this.class.toJSON(),
      identifier: this.identifier.toString(),
      creator: this.creator.toString(),
      dates: this.dates.toJSON(),
      holder: this.holder.toString(),
      category: this.category.toJSON(),
      superCategory: this.superCategory.toJSON(),
      eventCategory: this.eventCategory,
      hash: this.hash.toString(),
      manager: this.manager.toString(),
      metadata: this.metadata.toJSON(),
      supply: this.supply.toString(),
      trackType: this.trackType.toJSON(),
      mainCurrencyHash: this.mainCurrencyHash.toString(),
      volume: this.volume.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: ArchiveDepositJSON): ArchiveDeposit {
    return new ArchiveDeposit({
      class: types.AccountClass.fromJSON(obj.class),
      identifier: new BN(obj.identifier),
      creator: new PublicKey(obj.creator),
      dates: types.IndexDates.fromJSON(obj.dates),
      holder: new PublicKey(obj.holder),
      category: types.Category.fromJSON(obj.category),
      superCategory: types.SuperCategory.fromJSON(obj.superCategory),
      eventCategory: obj.eventCategory,
      hash: new BN(obj.hash),
      manager: new PublicKey(obj.manager),
      metadata: types.MetadataArgs.fromJSON(obj.metadata),
      supply: new BN(obj.supply),
      trackType: types.TrackRegistry.fromJSON(obj.trackType),
      mainCurrencyHash: new BN(obj.mainCurrencyHash),
      volume: obj.volume.map((item) => types.FakeVolumeTrack.fromJSON(item)),
    })
  }
}
