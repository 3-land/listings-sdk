import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";

export interface TokenMetadataFields {
  name: string;
  symbol: string;
  arweave: string;
}

export interface TokenMetadataJSON {
  name: string;
  symbol: string;
  arweave: string;
}

export class TokenMetadata {
  readonly name: string;
  readonly symbol: string;
  readonly arweave: string;

  constructor(fields: TokenMetadataFields) {
    this.name = fields.name;
    this.symbol = fields.symbol;
    this.arweave = fields.arweave;
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.str("name"), borsh.str("symbol"), borsh.str("arweave")],
      property
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TokenMetadata({
      name: obj.name,
      symbol: obj.symbol,
      arweave: obj.arweave,
    });
  }

  static toEncodable(fields: TokenMetadataFields) {
    return {
      name: fields.name,
      symbol: fields.symbol,
      arweave: fields.arweave,
    };
  }

  toJSON(): TokenMetadataJSON {
    return {
      name: this.name,
      symbol: this.symbol,
      arweave: this.arweave,
    };
  }

  static fromJSON(obj: TokenMetadataJSON): TokenMetadata {
    return new TokenMetadata({
      name: obj.name,
      symbol: obj.symbol,
      arweave: obj.arweave,
    });
  }

  toEncodable() {
    return TokenMetadata.toEncodable(this);
  }
}
