import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PaymentV1JSON {
  kind: "PaymentV1"
}

export class PaymentV1 {
  static readonly discriminator = 0
  static readonly kind = "PaymentV1"
  readonly discriminator = 0
  readonly kind = "PaymentV1"

  toJSON(): PaymentV1JSON {
    return {
      kind: "PaymentV1",
    }
  }

  toEncodable() {
    return {
      PaymentV1: {},
    }
  }
}

export interface BurnPaymentV1JSON {
  kind: "BurnPaymentV1"
}

export class BurnPaymentV1 {
  static readonly discriminator = 1
  static readonly kind = "BurnPaymentV1"
  readonly discriminator = 1
  readonly kind = "BurnPaymentV1"

  toJSON(): BurnPaymentV1JSON {
    return {
      kind: "BurnPaymentV1",
    }
  }

  toEncodable() {
    return {
      BurnPaymentV1: {},
    }
  }
}

export interface GatePaymentV1JSON {
  kind: "GatePaymentV1"
}

export class GatePaymentV1 {
  static readonly discriminator = 2
  static readonly kind = "GatePaymentV1"
  readonly discriminator = 2
  readonly kind = "GatePaymentV1"

  toJSON(): GatePaymentV1JSON {
    return {
      kind: "GatePaymentV1",
    }
  }

  toEncodable() {
    return {
      GatePaymentV1: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PaymentClassKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("PaymentV1" in obj) {
    return new PaymentV1()
  }
  if ("BurnPaymentV1" in obj) {
    return new BurnPaymentV1()
  }
  if ("GatePaymentV1" in obj) {
    return new GatePaymentV1()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PaymentClassJSON): types.PaymentClassKind {
  switch (obj.kind) {
    case "PaymentV1": {
      return new PaymentV1()
    }
    case "BurnPaymentV1": {
      return new BurnPaymentV1()
    }
    case "GatePaymentV1": {
      return new GatePaymentV1()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "PaymentV1"),
    borsh.struct([], "BurnPaymentV1"),
    borsh.struct([], "GatePaymentV1"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
