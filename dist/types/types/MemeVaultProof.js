import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class MemeVaultProof {
    constructor(fields) {
        this.amount = fields.amount;
        this.halfCurrencyHash = fields.halfCurrencyHash;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("amount"), borsh.u32("halfCurrencyHash")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MemeVaultProof({
            amount: obj.amount,
            halfCurrencyHash: obj.halfCurrencyHash,
        });
    }
    static toEncodable(fields) {
        return {
            amount: fields.amount,
            halfCurrencyHash: fields.halfCurrencyHash,
        };
    }
    toJSON() {
        return {
            amount: this.amount.toString(),
            halfCurrencyHash: this.halfCurrencyHash,
        };
    }
    static fromJSON(obj) {
        return new MemeVaultProof({
            amount: new BN(obj.amount),
            halfCurrencyHash: obj.halfCurrencyHash,
        });
    }
    toEncodable() {
        return MemeVaultProof.toEncodable(this);
    }
}
