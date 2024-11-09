import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface TokenManagerFields {
  class: types.AccountClassKind
  storeHash: BN
  tokenType: types.TokenTypeKind
  state: types.TokenStateKind
  currency: PublicKey
  creator: PublicKey
  communityShare: number
  name: string
  base: BN
  price: BN
  supply: BN
  created: BN
  pool: BN
  pending: BN
  taxes: Array<number>
  options: Array<number>
  extra: Array<number>
}

export interface TokenManagerJSON {
  class: types.AccountClassJSON
  storeHash: string
  tokenType: types.TokenTypeJSON
  state: types.TokenStateJSON
  currency: string
  creator: string
  communityShare: number
  name: string
  base: string
  price: string
  supply: string
  created: string
  pool: string
  pending: string
  taxes: Array<number>
  options: Array<number>
  extra: Array<number>
}

export class TokenManager {
  readonly class: types.AccountClassKind
  readonly storeHash: BN
  readonly tokenType: types.TokenTypeKind
  readonly state: types.TokenStateKind
  readonly currency: PublicKey
  readonly creator: PublicKey
  readonly communityShare: number
  readonly name: string
  readonly base: BN
  readonly price: BN
  readonly supply: BN
  readonly created: BN
  readonly pool: BN
  readonly pending: BN
  readonly taxes: Array<number>
  readonly options: Array<number>
  readonly extra: Array<number>

  static readonly discriminator = Buffer.from([
    185, 97, 124, 231, 70, 75, 228, 47,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.u64("storeHash"),
    types.TokenType.layout("tokenType"),
    types.TokenState.layout("state"),
    borsh.publicKey("currency"),
    borsh.publicKey("creator"),
    borsh.u16("communityShare"),
    borsh.str("name"),
    borsh.u64("base"),
    borsh.u64("price"),
    borsh.u64("supply"),
    borsh.u64("created"),
    borsh.u64("pool"),
    borsh.u64("pending"),
    borsh.array(borsh.u16(), 4, "taxes"),
    borsh.array(borsh.u8(), 8, "options"),
    borsh.array(borsh.u8(), 64, "extra"),
  ])

  constructor(fields: TokenManagerFields) {
    this.class = fields.class
    this.storeHash = fields.storeHash
    this.tokenType = fields.tokenType
    this.state = fields.state
    this.currency = fields.currency
    this.creator = fields.creator
    this.communityShare = fields.communityShare
    this.name = fields.name
    this.base = fields.base
    this.price = fields.price
    this.supply = fields.supply
    this.created = fields.created
    this.pool = fields.pool
    this.pending = fields.pending
    this.taxes = fields.taxes
    this.options = fields.options
    this.extra = fields.extra
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<TokenManager | null> {
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
  ): Promise<Array<TokenManager | null>> {
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

  static decode(data: Buffer): TokenManager {
    if (!data.slice(0, 8).equals(TokenManager.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = TokenManager.layout.decode(data.slice(8))

    return new TokenManager({
      class: types.AccountClass.fromDecoded(dec.class),
      storeHash: dec.storeHash,
      tokenType: types.TokenType.fromDecoded(dec.tokenType),
      state: types.TokenState.fromDecoded(dec.state),
      currency: dec.currency,
      creator: dec.creator,
      communityShare: dec.communityShare,
      name: dec.name,
      base: dec.base,
      price: dec.price,
      supply: dec.supply,
      created: dec.created,
      pool: dec.pool,
      pending: dec.pending,
      taxes: dec.taxes,
      options: dec.options,
      extra: dec.extra,
    })
  }

  toJSON(): TokenManagerJSON {
    return {
      class: this.class.toJSON(),
      storeHash: this.storeHash.toString(),
      tokenType: this.tokenType.toJSON(),
      state: this.state.toJSON(),
      currency: this.currency.toString(),
      creator: this.creator.toString(),
      communityShare: this.communityShare,
      name: this.name,
      base: this.base.toString(),
      price: this.price.toString(),
      supply: this.supply.toString(),
      created: this.created.toString(),
      pool: this.pool.toString(),
      pending: this.pending.toString(),
      taxes: this.taxes,
      options: this.options,
      extra: this.extra,
    }
  }

  static fromJSON(obj: TokenManagerJSON): TokenManager {
    return new TokenManager({
      class: types.AccountClass.fromJSON(obj.class),
      storeHash: new BN(obj.storeHash),
      tokenType: types.TokenType.fromJSON(obj.tokenType),
      state: types.TokenState.fromJSON(obj.state),
      currency: new PublicKey(obj.currency),
      creator: new PublicKey(obj.creator),
      communityShare: obj.communityShare,
      name: obj.name,
      base: new BN(obj.base),
      price: new BN(obj.price),
      supply: new BN(obj.supply),
      created: new BN(obj.created),
      pool: new BN(obj.pool),
      pending: new BN(obj.pending),
      taxes: obj.taxes,
      options: obj.options,
      extra: obj.extra,
    })
  }
}
