import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CardFields {
  class: types.AccountClassKind
  globalState: types.GlobalStateKind
  store: PublicKey
  creator: PublicKey
  holder: PublicKey
  hash: BN
  page: BN
  manager: PublicKey
  index: number
  hashTraits: BN
  created: number
  reserved: Array<number>
  item: types.ItemFields
}

export interface CardJSON {
  class: types.AccountClassJSON
  globalState: types.GlobalStateJSON
  store: string
  creator: string
  holder: string
  hash: string
  page: string
  manager: string
  index: number
  hashTraits: string
  created: number
  reserved: Array<number>
  item: types.ItemJSON
}

export class Card {
  readonly class: types.AccountClassKind
  readonly globalState: types.GlobalStateKind
  readonly store: PublicKey
  readonly creator: PublicKey
  readonly holder: PublicKey
  readonly hash: BN
  readonly page: BN
  readonly manager: PublicKey
  readonly index: number
  readonly hashTraits: BN
  readonly created: number
  readonly reserved: Array<number>
  readonly item: types.Item

  static readonly discriminator = Buffer.from([
    166, 250, 46, 230, 152, 63, 140, 182,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.GlobalState.layout("globalState"),
    borsh.publicKey("store"),
    borsh.publicKey("creator"),
    borsh.publicKey("holder"),
    borsh.u64("hash"),
    borsh.u64("page"),
    borsh.publicKey("manager"),
    borsh.u16("index"),
    borsh.u64("hashTraits"),
    borsh.u32("created"),
    borsh.array(borsh.u8(), 16, "reserved"),
    types.Item.layout("item"),
  ])

  constructor(fields: CardFields) {
    this.class = fields.class
    this.globalState = fields.globalState
    this.store = fields.store
    this.creator = fields.creator
    this.holder = fields.holder
    this.hash = fields.hash
    this.page = fields.page
    this.manager = fields.manager
    this.index = fields.index
    this.hashTraits = fields.hashTraits
    this.created = fields.created
    this.reserved = fields.reserved
    this.item = new types.Item({ ...fields.item })
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Card | null> {
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
  ): Promise<Array<Card | null>> {
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

  static decode(data: Buffer): Card {
    if (!data.slice(0, 8).equals(Card.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Card.layout.decode(data.slice(8))

    return new Card({
      class: types.AccountClass.fromDecoded(dec.class),
      globalState: types.GlobalState.fromDecoded(dec.globalState),
      store: dec.store,
      creator: dec.creator,
      holder: dec.holder,
      hash: dec.hash,
      page: dec.page,
      manager: dec.manager,
      index: dec.index,
      hashTraits: dec.hashTraits,
      created: dec.created,
      reserved: dec.reserved,
      item: types.Item.fromDecoded(dec.item),
    })
  }

  toJSON(): CardJSON {
    return {
      class: this.class.toJSON(),
      globalState: this.globalState.toJSON(),
      store: this.store.toString(),
      creator: this.creator.toString(),
      holder: this.holder.toString(),
      hash: this.hash.toString(),
      page: this.page.toString(),
      manager: this.manager.toString(),
      index: this.index,
      hashTraits: this.hashTraits.toString(),
      created: this.created,
      reserved: this.reserved,
      item: this.item.toJSON(),
    }
  }

  static fromJSON(obj: CardJSON): Card {
    return new Card({
      class: types.AccountClass.fromJSON(obj.class),
      globalState: types.GlobalState.fromJSON(obj.globalState),
      store: new PublicKey(obj.store),
      creator: new PublicKey(obj.creator),
      holder: new PublicKey(obj.holder),
      hash: new BN(obj.hash),
      page: new BN(obj.page),
      manager: new PublicKey(obj.manager),
      index: obj.index,
      hashTraits: new BN(obj.hashTraits),
      created: obj.created,
      reserved: obj.reserved,
      item: types.Item.fromJSON(obj.item),
    })
  }
}
