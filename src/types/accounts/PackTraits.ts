import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PackTraitsFields {
  class: types.AccountClassKind
  list: Array<types.TraitTypeKind>
}

export interface PackTraitsJSON {
  class: types.AccountClassJSON
  list: Array<types.TraitTypeJSON>
}

export class PackTraits {
  readonly class: types.AccountClassKind
  readonly list: Array<types.TraitTypeKind>

  static readonly discriminator = Buffer.from([
    238, 139, 229, 97, 133, 123, 168, 248,
  ])

  static readonly layout = borsh.struct([
    types.AccountClass.layout("class"),
    borsh.vec(types.TraitType.layout(), "list"),
  ])

  constructor(fields: PackTraitsFields) {
    this.class = fields.class
    this.list = fields.list
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PackTraits | null> {
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
  ): Promise<Array<PackTraits | null>> {
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

  static decode(data: Buffer): PackTraits {
    if (!data.slice(0, 8).equals(PackTraits.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = PackTraits.layout.decode(data.slice(8))

    return new PackTraits({
      class: types.AccountClass.fromDecoded(dec.class),
      list: dec.list.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.TraitType.fromDecoded(item)
      ),
    })
  }

  toJSON(): PackTraitsJSON {
    return {
      class: this.class.toJSON(),
      list: this.list.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: PackTraitsJSON): PackTraits {
    return new PackTraits({
      class: types.AccountClass.fromJSON(obj.class),
      list: obj.list.map((item) => types.TraitType.fromJSON(item)),
    })
  }
}
