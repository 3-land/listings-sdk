import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PoolVaultFields {
  class: types.AccountClassKind
  state: types.PoolStateKind
  storeHash: BN
  currency: PublicKey
  creator: PublicKey
  poolType: types.PoolTypeKind
  poolHash: BN
  access: types.PoolAccessKind
  deposit: BN
  secured: BN
  decimals: number
  managers: Array<PublicKey>
  name: string
  ins: number
  outs: number
  volumeOut: BN
  volumeIn: BN
  defaultCurrency: number
  createdAt: number
  flags: Array<number>
  config: Array<types.PoolConfigKind>
  otherCurrencies: Array<types.CurrencyFields>
}

export interface PoolVaultJSON {
  class: types.AccountClassJSON
  state: types.PoolStateJSON
  storeHash: string
  currency: string
  creator: string
  poolType: types.PoolTypeJSON
  poolHash: string
  access: types.PoolAccessJSON
  deposit: string
  secured: string
  decimals: number
  managers: Array<string>
  name: string
  ins: number
  outs: number
  volumeOut: string
  volumeIn: string
  defaultCurrency: number
  createdAt: number
  flags: Array<number>
  config: Array<types.PoolConfigJSON>
  otherCurrencies: Array<types.CurrencyJSON>
}

export class PoolVault {
  readonly class: types.AccountClassKind
  readonly state: types.PoolStateKind
  readonly storeHash: BN
  readonly currency: PublicKey
  readonly creator: PublicKey
  readonly poolType: types.PoolTypeKind
  readonly poolHash: BN
  readonly access: types.PoolAccessKind
  readonly deposit: BN
  readonly secured: BN
  readonly decimals: number
  readonly managers: Array<PublicKey>
  readonly name: string
  readonly ins: number
  readonly outs: number
  readonly volumeOut: BN
  readonly volumeIn: BN
  readonly defaultCurrency: number
  readonly createdAt: number
  readonly flags: Array<number>
  readonly config: Array<types.PoolConfigKind>
  readonly otherCurrencies: Array<types.Currency>

  static readonly discriminator = Buffer.from([
    9, 184, 204, 69, 231, 82, 252, 154,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    types.PoolState.layout("state"),
    borsh.u64("storeHash"),
    borsh.publicKey("currency"),
    borsh.publicKey("creator"),
    types.PoolType.layout("poolType"),
    borsh.u64("poolHash"),
    types.PoolAccess.layout("access"),
    borsh.u64("deposit"),
    borsh.u64("secured"),
    borsh.u8("decimals"),
    borsh.vec(borsh.publicKey(), "managers"),
    borsh.str("name"),
    borsh.u32("ins"),
    borsh.u32("outs"),
    borsh.u64("volumeOut"),
    borsh.u64("volumeIn"),
    borsh.u8("defaultCurrency"),
    borsh.u32("createdAt"),
    borsh.array(borsh.u8(), 3, "flags"),
    borsh.vec(types.PoolConfig.layout(), "config"),
    borsh.vec(types.Currency.layout(), "otherCurrencies"),
  ])

  constructor(fields: PoolVaultFields) {
    this.class = fields.class
    this.state = fields.state
    this.storeHash = fields.storeHash
    this.currency = fields.currency
    this.creator = fields.creator
    this.poolType = fields.poolType
    this.poolHash = fields.poolHash
    this.access = fields.access
    this.deposit = fields.deposit
    this.secured = fields.secured
    this.decimals = fields.decimals
    this.managers = fields.managers
    this.name = fields.name
    this.ins = fields.ins
    this.outs = fields.outs
    this.volumeOut = fields.volumeOut
    this.volumeIn = fields.volumeIn
    this.defaultCurrency = fields.defaultCurrency
    this.createdAt = fields.createdAt
    this.flags = fields.flags
    this.config = fields.config
    this.otherCurrencies = fields.otherCurrencies.map(
      (item) => new types.Currency({ ...item })
    )
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PoolVault | null> {
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
  ): Promise<Array<PoolVault | null>> {
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

  static decode(data: Buffer): PoolVault {
    if (!data.slice(0, 8).equals(PoolVault.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = PoolVault.layout.decode(data.slice(8))

    return new PoolVault({
      class: types.AccountClass.fromDecoded(dec.class),
      state: types.PoolState.fromDecoded(dec.state),
      storeHash: dec.storeHash,
      currency: dec.currency,
      creator: dec.creator,
      poolType: types.PoolType.fromDecoded(dec.poolType),
      poolHash: dec.poolHash,
      access: types.PoolAccess.fromDecoded(dec.access),
      deposit: dec.deposit,
      secured: dec.secured,
      decimals: dec.decimals,
      managers: dec.managers,
      name: dec.name,
      ins: dec.ins,
      outs: dec.outs,
      volumeOut: dec.volumeOut,
      volumeIn: dec.volumeIn,
      defaultCurrency: dec.defaultCurrency,
      createdAt: dec.createdAt,
      flags: dec.flags,
      config: dec.config.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.PoolConfig.fromDecoded(item)
      ),
      otherCurrencies: dec.otherCurrencies.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Currency.fromDecoded(item)
      ),
    })
  }

  toJSON(): PoolVaultJSON {
    return {
      class: this.class.toJSON(),
      state: this.state.toJSON(),
      storeHash: this.storeHash.toString(),
      currency: this.currency.toString(),
      creator: this.creator.toString(),
      poolType: this.poolType.toJSON(),
      poolHash: this.poolHash.toString(),
      access: this.access.toJSON(),
      deposit: this.deposit.toString(),
      secured: this.secured.toString(),
      decimals: this.decimals,
      managers: this.managers.map((item) => item.toString()),
      name: this.name,
      ins: this.ins,
      outs: this.outs,
      volumeOut: this.volumeOut.toString(),
      volumeIn: this.volumeIn.toString(),
      defaultCurrency: this.defaultCurrency,
      createdAt: this.createdAt,
      flags: this.flags,
      config: this.config.map((item) => item.toJSON()),
      otherCurrencies: this.otherCurrencies.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: PoolVaultJSON): PoolVault {
    return new PoolVault({
      class: types.AccountClass.fromJSON(obj.class),
      state: types.PoolState.fromJSON(obj.state),
      storeHash: new BN(obj.storeHash),
      currency: new PublicKey(obj.currency),
      creator: new PublicKey(obj.creator),
      poolType: types.PoolType.fromJSON(obj.poolType),
      poolHash: new BN(obj.poolHash),
      access: types.PoolAccess.fromJSON(obj.access),
      deposit: new BN(obj.deposit),
      secured: new BN(obj.secured),
      decimals: obj.decimals,
      managers: obj.managers.map((item) => new PublicKey(item)),
      name: obj.name,
      ins: obj.ins,
      outs: obj.outs,
      volumeOut: new BN(obj.volumeOut),
      volumeIn: new BN(obj.volumeIn),
      defaultCurrency: obj.defaultCurrency,
      createdAt: obj.createdAt,
      flags: obj.flags,
      config: obj.config.map((item) => types.PoolConfig.fromJSON(item)),
      otherCurrencies: obj.otherCurrencies.map((item) =>
        types.Currency.fromJSON(item)
      ),
    })
  }
}
