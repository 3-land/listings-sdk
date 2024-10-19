import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ThreeIdFields {
  class: types.AccountClassKind
  holderHash: BN
  creator: PublicKey
  lutAccount: PublicKey
  points1: BN
  points2: BN
  coin1: number
  coin2: number
  settings: Array<number>
  subwallets: Array<PublicKey>
  username: string
  generalStore: Array<types.GeneralStoreKind>
  extra: Array<number>
}

export interface ThreeIdJSON {
  class: types.AccountClassJSON
  holderHash: string
  creator: string
  lutAccount: string
  points1: string
  points2: string
  coin1: number
  coin2: number
  settings: Array<number>
  subwallets: Array<string>
  username: string
  generalStore: Array<types.GeneralStoreJSON>
  extra: Array<number>
}

export class ThreeId {
  readonly class: types.AccountClassKind
  readonly holderHash: BN
  readonly creator: PublicKey
  readonly lutAccount: PublicKey
  readonly points1: BN
  readonly points2: BN
  readonly coin1: number
  readonly coin2: number
  readonly settings: Array<number>
  readonly subwallets: Array<PublicKey>
  readonly username: string
  readonly generalStore: Array<types.GeneralStoreKind>
  readonly extra: Array<number>

  static readonly discriminator = Buffer.from([123, 56, 150, 21, 8, 4, 144, 81])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("holderHash"),
    borsh.publicKey("creator"),
    borsh.publicKey("lutAccount"),
    borsh.u64("points1"),
    borsh.u64("points2"),
    borsh.u32("coin1"),
    borsh.u32("coin2"),
    borsh.array(borsh.u8(), 8, "settings"),
    borsh.vec(borsh.publicKey(), "subwallets"),
    borsh.str("username"),
    borsh.vec(types.GeneralStore.layout(), "generalStore"),
    borsh.array(borsh.u8(), 32, "extra"),
  ])

  constructor(fields: ThreeIdFields) {
    this.class = fields.class
    this.holderHash = fields.holderHash
    this.creator = fields.creator
    this.lutAccount = fields.lutAccount
    this.points1 = fields.points1
    this.points2 = fields.points2
    this.coin1 = fields.coin1
    this.coin2 = fields.coin2
    this.settings = fields.settings
    this.subwallets = fields.subwallets
    this.username = fields.username
    this.generalStore = fields.generalStore
    this.extra = fields.extra
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ThreeId | null> {
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
  ): Promise<Array<ThreeId | null>> {
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

  static decode(data: Buffer): ThreeId {
    if (!data.slice(0, 8).equals(ThreeId.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ThreeId.layout.decode(data.slice(8))

    return new ThreeId({
      class: types.AccountClass.fromDecoded(dec.class),
      holderHash: dec.holderHash,
      creator: dec.creator,
      lutAccount: dec.lutAccount,
      points1: dec.points1,
      points2: dec.points2,
      coin1: dec.coin1,
      coin2: dec.coin2,
      settings: dec.settings,
      subwallets: dec.subwallets,
      username: dec.username,
      generalStore: dec.generalStore.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.GeneralStore.fromDecoded(item)
      ),
      extra: dec.extra,
    })
  }

  toJSON(): ThreeIdJSON {
    return {
      class: this.class.toJSON(),
      holderHash: this.holderHash.toString(),
      creator: this.creator.toString(),
      lutAccount: this.lutAccount.toString(),
      points1: this.points1.toString(),
      points2: this.points2.toString(),
      coin1: this.coin1,
      coin2: this.coin2,
      settings: this.settings,
      subwallets: this.subwallets.map((item) => item.toString()),
      username: this.username,
      generalStore: this.generalStore.map((item) => item.toJSON()),
      extra: this.extra,
    }
  }

  static fromJSON(obj: ThreeIdJSON): ThreeId {
    return new ThreeId({
      class: types.AccountClass.fromJSON(obj.class),
      holderHash: new BN(obj.holderHash),
      creator: new PublicKey(obj.creator),
      lutAccount: new PublicKey(obj.lutAccount),
      points1: new BN(obj.points1),
      points2: new BN(obj.points2),
      coin1: obj.coin1,
      coin2: obj.coin2,
      settings: obj.settings,
      subwallets: obj.subwallets.map((item) => new PublicKey(item)),
      username: obj.username,
      generalStore: obj.generalStore.map((item) =>
        types.GeneralStore.fromJSON(item)
      ),
      extra: obj.extra,
    })
  }
}
