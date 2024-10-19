import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RevealForMeFields {
  class: types.AccountClassKind
  storeHalfHash: Array<number>
  state: number
  creator: PublicKey
  nft: PublicKey
  random: number
  data: Uint8Array
}

export interface RevealForMeJSON {
  class: types.AccountClassJSON
  storeHalfHash: Array<number>
  state: number
  creator: string
  nft: string
  random: number
  data: Array<number>
}

export class RevealForMe {
  readonly class: types.AccountClassKind
  readonly storeHalfHash: Array<number>
  readonly state: number
  readonly creator: PublicKey
  readonly nft: PublicKey
  readonly random: number
  readonly data: Uint8Array

  static readonly discriminator = Buffer.from([5, 57, 21, 62, 5, 138, 252, 237])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.array(borsh.u8(), 4, "storeHalfHash"),
    borsh.u8("state"),
    borsh.publicKey("creator"),
    borsh.publicKey("nft"),
    borsh.u16("random"),
    borsh.vecU8("data"),
  ])

  constructor(fields: RevealForMeFields) {
    this.class = fields.class
    this.storeHalfHash = fields.storeHalfHash
    this.state = fields.state
    this.creator = fields.creator
    this.nft = fields.nft
    this.random = fields.random
    this.data = fields.data
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<RevealForMe | null> {
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
  ): Promise<Array<RevealForMe | null>> {
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

  static decode(data: Buffer): RevealForMe {
    if (!data.slice(0, 8).equals(RevealForMe.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = RevealForMe.layout.decode(data.slice(8))

    return new RevealForMe({
      class: types.AccountClass.fromDecoded(dec.class),
      storeHalfHash: dec.storeHalfHash,
      state: dec.state,
      creator: dec.creator,
      nft: dec.nft,
      random: dec.random,
      data: new Uint8Array(
        dec.data.buffer,
        dec.data.byteOffset,
        dec.data.length
      ),
    })
  }

  toJSON(): RevealForMeJSON {
    return {
      class: this.class.toJSON(),
      storeHalfHash: this.storeHalfHash,
      state: this.state,
      creator: this.creator.toString(),
      nft: this.nft.toString(),
      random: this.random,
      data: Array.from(this.data.values()),
    }
  }

  static fromJSON(obj: RevealForMeJSON): RevealForMe {
    return new RevealForMe({
      class: types.AccountClass.fromJSON(obj.class),
      storeHalfHash: obj.storeHalfHash,
      state: obj.state,
      creator: new PublicKey(obj.creator),
      nft: new PublicKey(obj.nft),
      random: obj.random,
      data: Uint8Array.from(obj.data),
    })
  }
}
