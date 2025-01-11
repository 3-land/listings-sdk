import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";

export interface CurrencyArtistProofFields {
  proofHash: BN;
  amount: BN;
  currencyVerifier: BN;
  artistVerifier: BN;
}

export interface CurrencyArtistProofJSON {
  proofHash: string;
  amount: string;
  currencyVerifier: BN;
  artistVerifier: BN;
}

export class CurrencyArtistProof {
  readonly proofHash: BN;
  readonly amount: BN;
  readonly currencyVerifier: BN;
  readonly artistVerifier: BN;

  constructor(fields: CurrencyArtistProofFields) {
    this.proofHash = fields.proofHash;
    this.amount = fields.amount;
    this.currencyVerifier = fields.currencyVerifier;
    this.artistVerifier = fields.artistVerifier;
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("proofHash"),
        borsh.u64("amount"),
        borsh.u32("currencyVerifier"),
        borsh.u32("artistVerifier"),
      ],
      property
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CurrencyArtistProof({
      proofHash: obj.proofHash,
      amount: obj.amount,
      currencyVerifier: obj.currencyVerifier,
      artistVerifier: obj.artistVerifier,
    });
  }

  static toEncodable(fields: CurrencyArtistProofFields) {
    return {
      proofHash: fields.proofHash,
      amount: fields.amount,
      currencyVerifier: fields.currencyVerifier,
      artistVerifier: fields.artistVerifier,
    };
  }

  toJSON(): CurrencyArtistProofJSON {
    return {
      proofHash: this.proofHash.toString(),
      amount: this.amount.toString(),
      currencyVerifier: this.currencyVerifier,
      artistVerifier: this.artistVerifier,
    };
  }

  static fromJSON(obj: CurrencyArtistProofJSON): CurrencyArtistProof {
    return new CurrencyArtistProof({
      proofHash: new BN(obj.proofHash),
      amount: new BN(obj.amount),
      currencyVerifier: obj.currencyVerifier,
      artistVerifier: obj.artistVerifier,
    });
  }

  toEncodable() {
    return CurrencyArtistProof.toEncodable(this);
  }
}
