import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class GlobalFee {
    constructor(fields) {
        this.delegate = fields.delegate;
        this.fee = fields.fee;
        this.feePercentage = fields.feePercentage;
        this.feeType = fields.feeType;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("delegate"),
            borsh.u64("fee"),
            borsh.u16("feePercentage"),
            types.FeeType.layout("feeType"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new GlobalFee({
            delegate: obj.delegate,
            fee: obj.fee,
            feePercentage: obj.feePercentage,
            feeType: types.FeeType.fromDecoded(obj.feeType),
        });
    }
    static toEncodable(fields) {
        return {
            delegate: fields.delegate,
            fee: fields.fee,
            feePercentage: fields.feePercentage,
            feeType: fields.feeType.toEncodable(),
        };
    }
    toJSON() {
        return {
            delegate: this.delegate.toString(),
            fee: this.fee.toString(),
            feePercentage: this.feePercentage,
            feeType: this.feeType.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new GlobalFee({
            delegate: new PublicKey(obj.delegate),
            fee: new BN(obj.fee),
            feePercentage: obj.feePercentage,
            feeType: types.FeeType.fromJSON(obj.feeType),
        });
    }
    toEncodable() {
        return GlobalFee.toEncodable(this);
    }
}
