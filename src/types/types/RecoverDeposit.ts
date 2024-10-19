import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoverDepositFields {
  cnft: types.CnftDataFields | null
}

export interface RecoverDepositJSON {
  cnft: types.CnftDataJSON | null
}

export class RecoverDeposit {
  readonly cnft: types.CnftData | null

  constructor(fields: RecoverDepositFields) {
    this.cnft = (fields.cnft && new types.CnftData({ ...fields.cnft })) || null
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.option(types.CnftData.layout(), "cnft")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoverDeposit({
      cnft: (obj.cnft && types.CnftData.fromDecoded(obj.cnft)) || null,
    })
  }

  static toEncodable(fields: RecoverDepositFields) {
    return {
      cnft: (fields.cnft && types.CnftData.toEncodable(fields.cnft)) || null,
    }
  }

  toJSON(): RecoverDepositJSON {
    return {
      cnft: (this.cnft && this.cnft.toJSON()) || null,
    }
  }

  static fromJSON(obj: RecoverDepositJSON): RecoverDeposit {
    return new RecoverDeposit({
      cnft: (obj.cnft && types.CnftData.fromJSON(obj.cnft)) || null,
    })
  }

  toEncodable() {
    return RecoverDeposit.toEncodable(this)
  }
}
