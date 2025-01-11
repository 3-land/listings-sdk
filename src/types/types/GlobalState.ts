import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface HiddenBySystemJSON {
  kind: "HiddenBySystem"
}

export class HiddenBySystem {
  static readonly discriminator = 0
  static readonly kind = "HiddenBySystem"
  readonly discriminator = 0
  readonly kind = "HiddenBySystem"

  toJSON(): HiddenBySystemJSON {
    return {
      kind: "HiddenBySystem",
    }
  }

  toEncodable() {
    return {
      HiddenBySystem: {},
    }
  }
}

export interface PublicJSON {
  kind: "Public"
}

export class Public {
  static readonly discriminator = 1
  static readonly kind = "Public"
  readonly discriminator = 1
  readonly kind = "Public"

  toJSON(): PublicJSON {
    return {
      kind: "Public",
    }
  }

  toEncodable() {
    return {
      Public: {},
    }
  }
}

export interface HiddenByUserJSON {
  kind: "HiddenByUser"
}

export class HiddenByUser {
  static readonly discriminator = 2
  static readonly kind = "HiddenByUser"
  readonly discriminator = 2
  readonly kind = "HiddenByUser"

  toJSON(): HiddenByUserJSON {
    return {
      kind: "HiddenByUser",
    }
  }

  toEncodable() {
    return {
      HiddenByUser: {},
    }
  }
}

export interface FlaggedPirateJSON {
  kind: "FlaggedPirate"
}

export class FlaggedPirate {
  static readonly discriminator = 3
  static readonly kind = "FlaggedPirate"
  readonly discriminator = 3
  readonly kind = "FlaggedPirate"

  toJSON(): FlaggedPirateJSON {
    return {
      kind: "FlaggedPirate",
    }
  }

  toEncodable() {
    return {
      FlaggedPirate: {},
    }
  }
}

export interface WaitingGlobalApprovalJSON {
  kind: "WaitingGlobalApproval"
}

export class WaitingGlobalApproval {
  static readonly discriminator = 4
  static readonly kind = "WaitingGlobalApproval"
  readonly discriminator = 4
  readonly kind = "WaitingGlobalApproval"

  toJSON(): WaitingGlobalApprovalJSON {
    return {
      kind: "WaitingGlobalApproval",
    }
  }

  toEncodable() {
    return {
      WaitingGlobalApproval: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.GlobalStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("HiddenBySystem" in obj) {
    return new HiddenBySystem()
  }
  if ("Public" in obj) {
    return new Public()
  }
  if ("HiddenByUser" in obj) {
    return new HiddenByUser()
  }
  if ("FlaggedPirate" in obj) {
    return new FlaggedPirate()
  }
  if ("WaitingGlobalApproval" in obj) {
    return new WaitingGlobalApproval()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.GlobalStateJSON): types.GlobalStateKind {
  switch (obj.kind) {
    case "HiddenBySystem": {
      return new HiddenBySystem()
    }
    case "Public": {
      return new Public()
    }
    case "HiddenByUser": {
      return new HiddenByUser()
    }
    case "FlaggedPirate": {
      return new FlaggedPirate()
    }
    case "WaitingGlobalApproval": {
      return new WaitingGlobalApproval()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "HiddenBySystem"),
    borsh.struct([], "Public"),
    borsh.struct([], "HiddenByUser"),
    borsh.struct([], "FlaggedPirate"),
    borsh.struct([], "WaitingGlobalApproval"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
