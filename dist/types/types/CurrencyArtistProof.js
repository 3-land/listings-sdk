import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class CurrencyArtistProof {
    constructor(fields) {
        this.proofHash = fields.proofHash;
        this.amount = fields.amount;
        this.currencyVerifier = fields.currencyVerifier;
        this.artistVerifier = fields.artistVerifier;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("proofHash"),
            borsh.u64("amount"),
            borsh.u32("currencyVerifier"),
            borsh.u32("artistVerifier"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CurrencyArtistProof({
            proofHash: obj.proofHash,
            amount: obj.amount,
            currencyVerifier: obj.currencyVerifier,
            artistVerifier: obj.artistVerifier,
        });
    }
    static toEncodable(fields) {
        return {
            proofHash: fields.proofHash,
            amount: fields.amount,
            currencyVerifier: fields.currencyVerifier,
            artistVerifier: fields.artistVerifier,
        };
    }
    toJSON() {
        return {
            proofHash: this.proofHash.toString(),
            amount: this.amount.toString(),
            currencyVerifier: this.currencyVerifier,
            artistVerifier: this.artistVerifier,
        };
    }
    static fromJSON(obj) {
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
