import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface HolderV1JSON {
  kind: "HolderV1"
}

export class HolderV1 {
  static readonly discriminator = 0
  static readonly kind = "HolderV1"
  readonly discriminator = 0
  readonly kind = "HolderV1"

  toJSON(): HolderV1JSON {
    return {
      kind: "HolderV1",
    }
  }

  toEncodable() {
    return {
      HolderV1: {},
    }
  }
}

export interface StoreV1JSON {
  kind: "StoreV1"
}

export class StoreV1 {
  static readonly discriminator = 1
  static readonly kind = "StoreV1"
  readonly discriminator = 1
  readonly kind = "StoreV1"

  toJSON(): StoreV1JSON {
    return {
      kind: "StoreV1",
    }
  }

  toEncodable() {
    return {
      StoreV1: {},
    }
  }
}

export interface SingleV1JSON {
  kind: "SingleV1"
}

export class SingleV1 {
  static readonly discriminator = 2
  static readonly kind = "SingleV1"
  readonly discriminator = 2
  readonly kind = "SingleV1"

  toJSON(): SingleV1JSON {
    return {
      kind: "SingleV1",
    }
  }

  toEncodable() {
    return {
      SingleV1: {},
    }
  }
}

export interface PackV1JSON {
  kind: "PackV1"
}

export class PackV1 {
  static readonly discriminator = 3
  static readonly kind = "PackV1"
  readonly discriminator = 3
  readonly kind = "PackV1"

  toJSON(): PackV1JSON {
    return {
      kind: "PackV1",
    }
  }

  toEncodable() {
    return {
      PackV1: {},
    }
  }
}

export interface CardV1JSON {
  kind: "CardV1"
}

export class CardV1 {
  static readonly discriminator = 4
  static readonly kind = "CardV1"
  readonly discriminator = 4
  readonly kind = "CardV1"

  toJSON(): CardV1JSON {
    return {
      kind: "CardV1",
    }
  }

  toEncodable() {
    return {
      CardV1: {},
    }
  }
}

export interface PackReceiptV1JSON {
  kind: "PackReceiptV1"
}

export class PackReceiptV1 {
  static readonly discriminator = 5
  static readonly kind = "PackReceiptV1"
  readonly discriminator = 5
  readonly kind = "PackReceiptV1"

  toJSON(): PackReceiptV1JSON {
    return {
      kind: "PackReceiptV1",
    }
  }

  toEncodable() {
    return {
      PackReceiptV1: {},
    }
  }
}

export interface PackContentV1JSON {
  kind: "PackContentV1"
}

export class PackContentV1 {
  static readonly discriminator = 6
  static readonly kind = "PackContentV1"
  readonly discriminator = 6
  readonly kind = "PackContentV1"

  toJSON(): PackContentV1JSON {
    return {
      kind: "PackContentV1",
    }
  }

  toEncodable() {
    return {
      PackContentV1: {},
    }
  }
}

export interface PackOpenHolderV1JSON {
  kind: "PackOpenHolderV1"
}

export class PackOpenHolderV1 {
  static readonly discriminator = 7
  static readonly kind = "PackOpenHolderV1"
  readonly discriminator = 7
  readonly kind = "PackOpenHolderV1"

  toJSON(): PackOpenHolderV1JSON {
    return {
      kind: "PackOpenHolderV1",
    }
  }

  toEncodable() {
    return {
      PackOpenHolderV1: {},
    }
  }
}

export interface BuyTrackV1JSON {
  kind: "BuyTrackV1"
}

export class BuyTrackV1 {
  static readonly discriminator = 8
  static readonly kind = "BuyTrackV1"
  readonly discriminator = 8
  readonly kind = "BuyTrackV1"

  toJSON(): BuyTrackV1JSON {
    return {
      kind: "BuyTrackV1",
    }
  }

  toEncodable() {
    return {
      BuyTrackV1: {},
    }
  }
}

export interface SingleArchiveV1JSON {
  kind: "SingleArchiveV1"
}

export class SingleArchiveV1 {
  static readonly discriminator = 9
  static readonly kind = "SingleArchiveV1"
  readonly discriminator = 9
  readonly kind = "SingleArchiveV1"

  toJSON(): SingleArchiveV1JSON {
    return {
      kind: "SingleArchiveV1",
    }
  }

  toEncodable() {
    return {
      SingleArchiveV1: {},
    }
  }
}

export interface PackArchiveV1JSON {
  kind: "PackArchiveV1"
}

export class PackArchiveV1 {
  static readonly discriminator = 10
  static readonly kind = "PackArchiveV1"
  readonly discriminator = 10
  readonly kind = "PackArchiveV1"

  toJSON(): PackArchiveV1JSON {
    return {
      kind: "PackArchiveV1",
    }
  }

  toEncodable() {
    return {
      PackArchiveV1: {},
    }
  }
}

export interface NoneJSON {
  kind: "None"
}

export class None {
  static readonly discriminator = 11
  static readonly kind = "None"
  readonly discriminator = 11
  readonly kind = "None"

  toJSON(): NoneJSON {
    return {
      kind: "None",
    }
  }

  toEncodable() {
    return {
      None: {},
    }
  }
}

export interface CreatorRegistryV1JSON {
  kind: "CreatorRegistryV1"
}

export class CreatorRegistryV1 {
  static readonly discriminator = 12
  static readonly kind = "CreatorRegistryV1"
  readonly discriminator = 12
  readonly kind = "CreatorRegistryV1"

  toJSON(): CreatorRegistryV1JSON {
    return {
      kind: "CreatorRegistryV1",
    }
  }

  toEncodable() {
    return {
      CreatorRegistryV1: {},
    }
  }
}

export interface CollectorGlobalRegistryV1JSON {
  kind: "CollectorGlobalRegistryV1"
}

export class CollectorGlobalRegistryV1 {
  static readonly discriminator = 13
  static readonly kind = "CollectorGlobalRegistryV1"
  readonly discriminator = 13
  readonly kind = "CollectorGlobalRegistryV1"

  toJSON(): CollectorGlobalRegistryV1JSON {
    return {
      kind: "CollectorGlobalRegistryV1",
    }
  }

  toEncodable() {
    return {
      CollectorGlobalRegistryV1: {},
    }
  }
}

export interface CollectorArtistRegistryV1JSON {
  kind: "CollectorArtistRegistryV1"
}

export class CollectorArtistRegistryV1 {
  static readonly discriminator = 14
  static readonly kind = "CollectorArtistRegistryV1"
  readonly discriminator = 14
  readonly kind = "CollectorArtistRegistryV1"

  toJSON(): CollectorArtistRegistryV1JSON {
    return {
      kind: "CollectorArtistRegistryV1",
    }
  }

  toEncodable() {
    return {
      CollectorArtistRegistryV1: {},
    }
  }
}

export interface PackTraitsV1JSON {
  kind: "PackTraitsV1"
}

export class PackTraitsV1 {
  static readonly discriminator = 15
  static readonly kind = "PackTraitsV1"
  readonly discriminator = 15
  readonly kind = "PackTraitsV1"

  toJSON(): PackTraitsV1JSON {
    return {
      kind: "PackTraitsV1",
    }
  }

  toEncodable() {
    return {
      PackTraitsV1: {},
    }
  }
}

export interface PackUploadsV1JSON {
  kind: "PackUploadsV1"
}

export class PackUploadsV1 {
  static readonly discriminator = 16
  static readonly kind = "PackUploadsV1"
  readonly discriminator = 16
  readonly kind = "PackUploadsV1"

  toJSON(): PackUploadsV1JSON {
    return {
      kind: "PackUploadsV1",
    }
  }

  toEncodable() {
    return {
      PackUploadsV1: {},
    }
  }
}

export interface ZeroOpenHolderV1JSON {
  kind: "ZeroOpenHolderV1"
}

export class ZeroOpenHolderV1 {
  static readonly discriminator = 17
  static readonly kind = "ZeroOpenHolderV1"
  readonly discriminator = 17
  readonly kind = "ZeroOpenHolderV1"

  toJSON(): ZeroOpenHolderV1JSON {
    return {
      kind: "ZeroOpenHolderV1",
    }
  }

  toEncodable() {
    return {
      ZeroOpenHolderV1: {},
    }
  }
}

export interface BurnDepositV1JSON {
  kind: "BurnDepositV1"
}

export class BurnDepositV1 {
  static readonly discriminator = 18
  static readonly kind = "BurnDepositV1"
  readonly discriminator = 18
  readonly kind = "BurnDepositV1"

  toJSON(): BurnDepositV1JSON {
    return {
      kind: "BurnDepositV1",
    }
  }

  toEncodable() {
    return {
      BurnDepositV1: {},
    }
  }
}

export interface GlobalBurnTrackV1JSON {
  kind: "GlobalBurnTrackV1"
}

export class GlobalBurnTrackV1 {
  static readonly discriminator = 19
  static readonly kind = "GlobalBurnTrackV1"
  readonly discriminator = 19
  readonly kind = "GlobalBurnTrackV1"

  toJSON(): GlobalBurnTrackV1JSON {
    return {
      kind: "GlobalBurnTrackV1",
    }
  }

  toEncodable() {
    return {
      GlobalBurnTrackV1: {},
    }
  }
}

export interface ArtistBurnTrackV1JSON {
  kind: "ArtistBurnTrackV1"
}

export class ArtistBurnTrackV1 {
  static readonly discriminator = 20
  static readonly kind = "ArtistBurnTrackV1"
  readonly discriminator = 20
  readonly kind = "ArtistBurnTrackV1"

  toJSON(): ArtistBurnTrackV1JSON {
    return {
      kind: "ArtistBurnTrackV1",
    }
  }

  toEncodable() {
    return {
      ArtistBurnTrackV1: {},
    }
  }
}

export interface SecureHolderV1JSON {
  kind: "SecureHolderV1"
}

export class SecureHolderV1 {
  static readonly discriminator = 21
  static readonly kind = "SecureHolderV1"
  readonly discriminator = 21
  readonly kind = "SecureHolderV1"

  toJSON(): SecureHolderV1JSON {
    return {
      kind: "SecureHolderV1",
    }
  }

  toEncodable() {
    return {
      SecureHolderV1: {},
    }
  }
}

export interface RevealerForMeV1JSON {
  kind: "RevealerForMeV1"
}

export class RevealerForMeV1 {
  static readonly discriminator = 22
  static readonly kind = "RevealerForMeV1"
  readonly discriminator = 22
  readonly kind = "RevealerForMeV1"

  toJSON(): RevealerForMeV1JSON {
    return {
      kind: "RevealerForMeV1",
    }
  }

  toEncodable() {
    return {
      RevealerForMeV1: {},
    }
  }
}

export interface ThreeIdV1JSON {
  kind: "ThreeIdV1"
}

export class ThreeIdV1 {
  static readonly discriminator = 23
  static readonly kind = "ThreeIdV1"
  readonly discriminator = 23
  readonly kind = "ThreeIdV1"

  toJSON(): ThreeIdV1JSON {
    return {
      kind: "ThreeIdV1",
    }
  }

  toEncodable() {
    return {
      ThreeIdV1: {},
    }
  }
}

export interface DonationRegistryV1JSON {
  kind: "DonationRegistryV1"
}

export class DonationRegistryV1 {
  static readonly discriminator = 24
  static readonly kind = "DonationRegistryV1"
  readonly discriminator = 24
  readonly kind = "DonationRegistryV1"

  toJSON(): DonationRegistryV1JSON {
    return {
      kind: "DonationRegistryV1",
    }
  }

  toEncodable() {
    return {
      DonationRegistryV1: {},
    }
  }
}

export interface PoolVaultV1JSON {
  kind: "PoolVaultV1"
}

export class PoolVaultV1 {
  static readonly discriminator = 25
  static readonly kind = "PoolVaultV1"
  readonly discriminator = 25
  readonly kind = "PoolVaultV1"

  toJSON(): PoolVaultV1JSON {
    return {
      kind: "PoolVaultV1",
    }
  }

  toEncodable() {
    return {
      PoolVaultV1: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.AccountClassKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("HolderV1" in obj) {
    return new HolderV1()
  }
  if ("StoreV1" in obj) {
    return new StoreV1()
  }
  if ("SingleV1" in obj) {
    return new SingleV1()
  }
  if ("PackV1" in obj) {
    return new PackV1()
  }
  if ("CardV1" in obj) {
    return new CardV1()
  }
  if ("PackReceiptV1" in obj) {
    return new PackReceiptV1()
  }
  if ("PackContentV1" in obj) {
    return new PackContentV1()
  }
  if ("PackOpenHolderV1" in obj) {
    return new PackOpenHolderV1()
  }
  if ("BuyTrackV1" in obj) {
    return new BuyTrackV1()
  }
  if ("SingleArchiveV1" in obj) {
    return new SingleArchiveV1()
  }
  if ("PackArchiveV1" in obj) {
    return new PackArchiveV1()
  }
  if ("None" in obj) {
    return new None()
  }
  if ("CreatorRegistryV1" in obj) {
    return new CreatorRegistryV1()
  }
  if ("CollectorGlobalRegistryV1" in obj) {
    return new CollectorGlobalRegistryV1()
  }
  if ("CollectorArtistRegistryV1" in obj) {
    return new CollectorArtistRegistryV1()
  }
  if ("PackTraitsV1" in obj) {
    return new PackTraitsV1()
  }
  if ("PackUploadsV1" in obj) {
    return new PackUploadsV1()
  }
  if ("ZeroOpenHolderV1" in obj) {
    return new ZeroOpenHolderV1()
  }
  if ("BurnDepositV1" in obj) {
    return new BurnDepositV1()
  }
  if ("GlobalBurnTrackV1" in obj) {
    return new GlobalBurnTrackV1()
  }
  if ("ArtistBurnTrackV1" in obj) {
    return new ArtistBurnTrackV1()
  }
  if ("SecureHolderV1" in obj) {
    return new SecureHolderV1()
  }
  if ("RevealerForMeV1" in obj) {
    return new RevealerForMeV1()
  }
  if ("ThreeIdV1" in obj) {
    return new ThreeIdV1()
  }
  if ("DonationRegistryV1" in obj) {
    return new DonationRegistryV1()
  }
  if ("PoolVaultV1" in obj) {
    return new PoolVaultV1()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.AccountClassJSON): types.AccountClassKind {
  switch (obj.kind) {
    case "HolderV1": {
      return new HolderV1()
    }
    case "StoreV1": {
      return new StoreV1()
    }
    case "SingleV1": {
      return new SingleV1()
    }
    case "PackV1": {
      return new PackV1()
    }
    case "CardV1": {
      return new CardV1()
    }
    case "PackReceiptV1": {
      return new PackReceiptV1()
    }
    case "PackContentV1": {
      return new PackContentV1()
    }
    case "PackOpenHolderV1": {
      return new PackOpenHolderV1()
    }
    case "BuyTrackV1": {
      return new BuyTrackV1()
    }
    case "SingleArchiveV1": {
      return new SingleArchiveV1()
    }
    case "PackArchiveV1": {
      return new PackArchiveV1()
    }
    case "None": {
      return new None()
    }
    case "CreatorRegistryV1": {
      return new CreatorRegistryV1()
    }
    case "CollectorGlobalRegistryV1": {
      return new CollectorGlobalRegistryV1()
    }
    case "CollectorArtistRegistryV1": {
      return new CollectorArtistRegistryV1()
    }
    case "PackTraitsV1": {
      return new PackTraitsV1()
    }
    case "PackUploadsV1": {
      return new PackUploadsV1()
    }
    case "ZeroOpenHolderV1": {
      return new ZeroOpenHolderV1()
    }
    case "BurnDepositV1": {
      return new BurnDepositV1()
    }
    case "GlobalBurnTrackV1": {
      return new GlobalBurnTrackV1()
    }
    case "ArtistBurnTrackV1": {
      return new ArtistBurnTrackV1()
    }
    case "SecureHolderV1": {
      return new SecureHolderV1()
    }
    case "RevealerForMeV1": {
      return new RevealerForMeV1()
    }
    case "ThreeIdV1": {
      return new ThreeIdV1()
    }
    case "DonationRegistryV1": {
      return new DonationRegistryV1()
    }
    case "PoolVaultV1": {
      return new PoolVaultV1()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "HolderV1"),
    borsh.struct([], "StoreV1"),
    borsh.struct([], "SingleV1"),
    borsh.struct([], "PackV1"),
    borsh.struct([], "CardV1"),
    borsh.struct([], "PackReceiptV1"),
    borsh.struct([], "PackContentV1"),
    borsh.struct([], "PackOpenHolderV1"),
    borsh.struct([], "BuyTrackV1"),
    borsh.struct([], "SingleArchiveV1"),
    borsh.struct([], "PackArchiveV1"),
    borsh.struct([], "None"),
    borsh.struct([], "CreatorRegistryV1"),
    borsh.struct([], "CollectorGlobalRegistryV1"),
    borsh.struct([], "CollectorArtistRegistryV1"),
    borsh.struct([], "PackTraitsV1"),
    borsh.struct([], "PackUploadsV1"),
    borsh.struct([], "ZeroOpenHolderV1"),
    borsh.struct([], "BurnDepositV1"),
    borsh.struct([], "GlobalBurnTrackV1"),
    borsh.struct([], "ArtistBurnTrackV1"),
    borsh.struct([], "SecureHolderV1"),
    borsh.struct([], "RevealerForMeV1"),
    borsh.struct([], "ThreeIdV1"),
    borsh.struct([], "DonationRegistryV1"),
    borsh.struct([], "PoolVaultV1"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
