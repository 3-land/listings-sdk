import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface StoreFields {
  class: types.AccountClassKind
  holder: PublicKey
  creator: PublicKey
  page: BN
  count: BN
  live: BN
  name: string
  config: types.StoreConfigFields
  storeId: number
  globalFee: types.GlobalFeeFields | null
  globalDeposit: BN
  cacheHolder: Array<number>
}

export interface StoreJSON {
  class: types.AccountClassJSON
  holder: string
  creator: string
  page: string
  count: string
  live: string
  name: string
  config: types.StoreConfigJSON
  storeId: number
  globalFee: types.GlobalFeeJSON | null
  globalDeposit: string
  cacheHolder: Array<number>
}

export class Store {
  readonly class: types.AccountClassKind
  readonly holder: PublicKey
  readonly creator: PublicKey
  readonly page: BN
  readonly count: BN
  readonly live: BN
  readonly name: string
  readonly config: types.StoreConfig
  readonly storeId: number
  readonly globalFee: types.GlobalFee | null
  readonly globalDeposit: BN
  readonly cacheHolder: Array<number>

  static readonly discriminator = Buffer.from([
    130, 48, 247, 244, 182, 191, 30, 26,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.publicKey("holder"),
    borsh.publicKey("creator"),
    borsh.u64("page"),
    borsh.u64("count"),
    borsh.u64("live"),
    borsh.str("name"),
    types.StoreConfig.layout("config"),
    borsh.u16("storeId"),
    borsh.option(types.GlobalFee.layout(), "globalFee"),
    borsh.u64("globalDeposit"),
    borsh.array(borsh.u8(), 128, "cacheHolder"),
  ])

  constructor(fields: StoreFields) {
    this.class = fields.class
    this.holder = fields.holder
    this.creator = fields.creator
    this.page = fields.page
    this.count = fields.count
    this.live = fields.live
    this.name = fields.name
    this.config = new types.StoreConfig({ ...fields.config })
    this.storeId = fields.storeId
    this.globalFee =
      (fields.globalFee && new types.GlobalFee({ ...fields.globalFee })) || null
    this.globalDeposit = fields.globalDeposit
    this.cacheHolder = fields.cacheHolder
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Store | null> {
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
  ): Promise<Array<Store | null>> {
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

  static decode(data: Buffer): Store {
    if (!data.slice(0, 8).equals(Store.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Store.layout.decode(data.slice(8))

    return new Store({
      class: types.AccountClass.fromDecoded(dec.class),
      holder: dec.holder,
      creator: dec.creator,
      page: dec.page,
      count: dec.count,
      live: dec.live,
      name: dec.name,
      config: types.StoreConfig.fromDecoded(dec.config),
      storeId: dec.storeId,
      globalFee:
        (dec.globalFee && types.GlobalFee.fromDecoded(dec.globalFee)) || null,
      globalDeposit: dec.globalDeposit,
      cacheHolder: dec.cacheHolder,
    })
  }

  toJSON(): StoreJSON {
    return {
      class: this.class.toJSON(),
      holder: this.holder.toString(),
      creator: this.creator.toString(),
      page: this.page.toString(),
      count: this.count.toString(),
      live: this.live.toString(),
      name: this.name,
      config: this.config.toJSON(),
      storeId: this.storeId,
      globalFee: (this.globalFee && this.globalFee.toJSON()) || null,
      globalDeposit: this.globalDeposit.toString(),
      cacheHolder: this.cacheHolder,
    }
  }

  static fromJSON(obj: StoreJSON): Store {
    return new Store({
      class: types.AccountClass.fromJSON(obj.class),
      holder: new PublicKey(obj.holder),
      creator: new PublicKey(obj.creator),
      page: new BN(obj.page),
      count: new BN(obj.count),
      live: new BN(obj.live),
      name: obj.name,
      config: types.StoreConfig.fromJSON(obj.config),
      storeId: obj.storeId,
      globalFee:
        (obj.globalFee && types.GlobalFee.fromJSON(obj.globalFee)) || null,
      globalDeposit: new BN(obj.globalDeposit),
      cacheHolder: obj.cacheHolder,
    })
  }
}
