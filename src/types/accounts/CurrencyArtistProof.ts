import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CurrencyArtistProofFields {
  proofHash: BN
  amount: BN
  currencyVerifier: number
  artistVerifier: number
}

export interface CurrencyArtistProofJSON {
  proofHash: string
  amount: string
  currencyVerifier: number
  artistVerifier: number
}

export class CurrencyArtistProof {
  readonly proofHash: BN
  readonly amount: BN
  readonly currencyVerifier: number
  readonly artistVerifier: number

  static readonly discriminator = Buffer.from([
    11, 32, 176, 50, 245, 55, 208, 119,
  ])

  static readonly layout = borsh.struct([
    borsh.u64("proofHash"),
    borsh.u64("amount"),
    borsh.u32("currencyVerifier"),
    borsh.u32("artistVerifier"),
  ])

  constructor(fields: CurrencyArtistProofFields) {
    this.proofHash = fields.proofHash
    this.amount = fields.amount
    this.currencyVerifier = fields.currencyVerifier
    this.artistVerifier = fields.artistVerifier
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<CurrencyArtistProof | null> {
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
  ): Promise<Array<CurrencyArtistProof | null>> {
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

  static decode(data: Buffer): CurrencyArtistProof {
    if (!data.slice(0, 8).equals(CurrencyArtistProof.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = CurrencyArtistProof.layout.decode(data.slice(8))

    return new CurrencyArtistProof({
      proofHash: dec.proofHash,
      amount: dec.amount,
      currencyVerifier: dec.currencyVerifier,
      artistVerifier: dec.artistVerifier,
    })
  }

  toJSON(): CurrencyArtistProofJSON {
    return {
      proofHash: this.proofHash.toString(),
      amount: this.amount.toString(),
      currencyVerifier: this.currencyVerifier,
      artistVerifier: this.artistVerifier,
    }
  }

  static fromJSON(obj: CurrencyArtistProofJSON): CurrencyArtistProof {
    return new CurrencyArtistProof({
      proofHash: new BN(obj.proofHash),
      amount: new BN(obj.amount),
      currencyVerifier: obj.currencyVerifier,
      artistVerifier: obj.artistVerifier,
    })
  }
}
