import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GenericUserFields {
  class: types.AccountClassKind
  subApp: BN
  holderHash: BN
  category: BN
  creator: PublicKey
  lutAccount: PublicKey
  subWallets: Array<PublicKey>
  extended: number
  flags: Array<number>
  username: string
  genericStore: Array<types.GenericStoreFields>
  extra: Array<number>
}

export interface GenericUserJSON {
  class: types.AccountClassJSON
  subApp: string
  holderHash: string
  category: string
  creator: string
  lutAccount: string
  subWallets: Array<string>
  extended: number
  flags: Array<number>
  username: string
  genericStore: Array<types.GenericStoreJSON>
  extra: Array<number>
}

export class GenericUser {
  readonly class: types.AccountClassKind
  readonly subApp: BN
  readonly holderHash: BN
  readonly category: BN
  readonly creator: PublicKey
  readonly lutAccount: PublicKey
  readonly subWallets: Array<PublicKey>
  readonly extended: number
  readonly flags: Array<number>
  readonly username: string
  readonly genericStore: Array<types.GenericStore>
  readonly extra: Array<number>

  static readonly discriminator = Buffer.from([
    222, 233, 191, 5, 55, 3, 237, 241,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("subApp"),
    borsh.u64("holderHash"),
    borsh.u64("category"),
    borsh.publicKey("creator"),
    borsh.publicKey("lutAccount"),
    borsh.vec(borsh.publicKey(), "subWallets"),
    borsh.u8("extended"),
    borsh.array(borsh.u8(), 8, "flags"),
    borsh.str("username"),
    borsh.vec(types.GenericStore.layout(), "genericStore"),
    borsh.array(borsh.u8(), 32, "extra"),
  ])

  constructor(fields: GenericUserFields) {
    this.class = fields.class
    this.subApp = fields.subApp
    this.holderHash = fields.holderHash
    this.category = fields.category
    this.creator = fields.creator
    this.lutAccount = fields.lutAccount
    this.subWallets = fields.subWallets
    this.extended = fields.extended
    this.flags = fields.flags
    this.username = fields.username
    this.genericStore = fields.genericStore.map(
      (item) => new types.GenericStore({ ...item })
    )
    this.extra = fields.extra
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<GenericUser | null> {
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
  ): Promise<Array<GenericUser | null>> {
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

  static decode(data: Buffer): GenericUser {
    if (!data.slice(0, 8).equals(GenericUser.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = GenericUser.layout.decode(data.slice(8))

    return new GenericUser({
      class: types.AccountClass.fromDecoded(dec.class),
      subApp: dec.subApp,
      holderHash: dec.holderHash,
      category: dec.category,
      creator: dec.creator,
      lutAccount: dec.lutAccount,
      subWallets: dec.subWallets,
      extended: dec.extended,
      flags: dec.flags,
      username: dec.username,
      genericStore: dec.genericStore.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.GenericStore.fromDecoded(item)
      ),
      extra: dec.extra,
    })
  }

  toJSON(): GenericUserJSON {
    return {
      class: this.class.toJSON(),
      subApp: this.subApp.toString(),
      holderHash: this.holderHash.toString(),
      category: this.category.toString(),
      creator: this.creator.toString(),
      lutAccount: this.lutAccount.toString(),
      subWallets: this.subWallets.map((item) => item.toString()),
      extended: this.extended,
      flags: this.flags,
      username: this.username,
      genericStore: this.genericStore.map((item) => item.toJSON()),
      extra: this.extra,
    }
  }

  static fromJSON(obj: GenericUserJSON): GenericUser {
    return new GenericUser({
      class: types.AccountClass.fromJSON(obj.class),
      subApp: new BN(obj.subApp),
      holderHash: new BN(obj.holderHash),
      category: new BN(obj.category),
      creator: new PublicKey(obj.creator),
      lutAccount: new PublicKey(obj.lutAccount),
      subWallets: obj.subWallets.map((item) => new PublicKey(item)),
      extended: obj.extended,
      flags: obj.flags,
      username: obj.username,
      genericStore: obj.genericStore.map((item) =>
        types.GenericStore.fromJSON(item)
      ),
      extra: obj.extra,
    })
  }
}
