import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class StoreConfig {
    constructor(fields) {
        this.fee = fields.fee;
        this.feePercentage = fields.feePercentage;
        this.feeType = fields.feeType;
        this.trust = fields.trust;
        this.rules = fields.rules;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("fee"),
            borsh.u16("feePercentage"),
            types.FeeType.layout("feeType"),
            borsh.publicKey("trust"),
            borsh.vec(types.StoreRule.layout(), "rules"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new StoreConfig({
            fee: obj.fee,
            feePercentage: obj.feePercentage,
            feeType: types.FeeType.fromDecoded(obj.feeType),
            trust: obj.trust,
            rules: obj.rules.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.StoreRule.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            fee: fields.fee,
            feePercentage: fields.feePercentage,
            feeType: fields.feeType.toEncodable(),
            trust: fields.trust,
            rules: fields.rules.map((item) => item.toEncodable()),
        };
    }
    toJSON() {
        return {
            fee: this.fee.toString(),
            feePercentage: this.feePercentage,
            feeType: this.feeType.toJSON(),
            trust: this.trust.toString(),
            rules: this.rules.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new StoreConfig({
            fee: new BN(obj.fee),
            feePercentage: obj.feePercentage,
            feeType: types.FeeType.fromJSON(obj.feeType),
            trust: new PublicKey(obj.trust),
            rules: obj.rules.map((item) => types.StoreRule.fromJSON(item)),
        });
    }
    toEncodable() {
        return StoreConfig.toEncodable(this);
    }
}
