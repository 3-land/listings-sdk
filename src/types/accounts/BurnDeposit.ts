import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BurnDepositFields {
  class: types.AccountClassKind
  deposits: Array<types.FakeDepositFields>
}

export interface BurnDepositJSON {
  class: types.AccountClassJSON
  deposits: Array<types.FakeDepositJSON>
}

export class BurnDeposit {
  readonly class: types.AccountClassKind
  readonly deposits: Array<types.FakeDeposit>

  static readonly discriminator = Buffer.from([
    219, 80, 192, 1, 224, 111, 166, 242,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.vec(types.FakeDeposit.layout(), "deposits"),
  ])

  constructor(fields: BurnDepositFields) {
    this.class = fields.class
    this.deposits = fields.deposits.map(
      (item) => new types.FakeDeposit({ ...item })
    )
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<BurnDeposit | null> {
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
  ): Promise<Array<BurnDeposit | null>> {
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

  static decode(data: Buffer): BurnDeposit {
    if (!data.slice(0, 8).equals(BurnDeposit.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = BurnDeposit.layout.decode(data.slice(8))

    return new BurnDeposit({
      class: types.AccountClass.fromDecoded(dec.class),
      deposits: dec.deposits.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.FakeDeposit.fromDecoded(item)
      ),
    })
  }

  toJSON(): BurnDepositJSON {
    return {
      class: this.class.toJSON(),
      deposits: this.deposits.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: BurnDepositJSON): BurnDeposit {
    return new BurnDeposit({
      class: types.AccountClass.fromJSON(obj.class),
      deposits: obj.deposits.map((item) => types.FakeDeposit.fromJSON(item)),
    })
  }
}
