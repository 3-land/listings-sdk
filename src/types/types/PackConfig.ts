import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PackConfigFields {
  amountPerPack: number
  chancesOfEmpty: number
  openAuthority: PublicKey
  packType: types.PackTypeKind
  packRules: Array<types.PackRuleKind>
}

export interface PackConfigJSON {
  amountPerPack: number
  chancesOfEmpty: number
  openAuthority: string
  packType: types.PackTypeJSON
  packRules: Array<types.PackRuleJSON>
}

export class PackConfig {
  readonly amountPerPack: number
  readonly chancesOfEmpty: number
  readonly openAuthority: PublicKey
  readonly packType: types.PackTypeKind
  readonly packRules: Array<types.PackRuleKind>

  constructor(fields: PackConfigFields) {
    this.amountPerPack = fields.amountPerPack
    this.chancesOfEmpty = fields.chancesOfEmpty
    this.openAuthority = fields.openAuthority
    this.packType = fields.packType
    this.packRules = fields.packRules
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("amountPerPack"),
        borsh.u16("chancesOfEmpty"),
        borsh.publicKey("openAuthority"),
        types.PackType.layout("packType"),
        borsh.vec(types.PackRule.layout(), "packRules"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new PackConfig({
      amountPerPack: obj.amountPerPack,
      chancesOfEmpty: obj.chancesOfEmpty,
      openAuthority: obj.openAuthority,
      packType: types.PackType.fromDecoded(obj.packType),
      packRules: obj.packRules.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.PackRule.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: PackConfigFields) {
    return {
      amountPerPack: fields.amountPerPack,
      chancesOfEmpty: fields.chancesOfEmpty,
      openAuthority: fields.openAuthority,
      packType: fields.packType.toEncodable(),
      packRules: fields.packRules.map((item) => item.toEncodable()),
    }
  }

  toJSON(): PackConfigJSON {
    return {
      amountPerPack: this.amountPerPack,
      chancesOfEmpty: this.chancesOfEmpty,
      openAuthority: this.openAuthority.toString(),
      packType: this.packType.toJSON(),
      packRules: this.packRules.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: PackConfigJSON): PackConfig {
    return new PackConfig({
      amountPerPack: obj.amountPerPack,
      chancesOfEmpty: obj.chancesOfEmpty,
      openAuthority: new PublicKey(obj.openAuthority),
      packType: types.PackType.fromJSON(obj.packType),
      packRules: obj.packRules.map((item) => types.PackRule.fromJSON(item)),
    })
  }

  toEncodable() {
    return PackConfig.toEncodable(this)
  }
}
