import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Deposit {
    constructor(fields) {
        this.depositType = fields.depositType;
        this.format = fields.format;
        this.interestHash = fields.interestHash;
        this.proofSize = fields.proofSize;
    }
    static layout(property) {
        return borsh.struct([
            types.DepositType.layout("depositType"),
            types.DepositFormat.layout("format"),
            borsh.u64("interestHash"),
            borsh.u8("proofSize"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Deposit({
            depositType: types.DepositType.fromDecoded(obj.depositType),
            format: types.DepositFormat.fromDecoded(obj.format),
            interestHash: obj.interestHash,
            proofSize: obj.proofSize,
        });
    }
    static toEncodable(fields) {
        return {
            depositType: fields.depositType.toEncodable(),
            format: fields.format.toEncodable(),
            interestHash: fields.interestHash,
            proofSize: fields.proofSize,
        };
    }
    toJSON() {
        return {
            depositType: this.depositType.toJSON(),
            format: this.format.toJSON(),
            interestHash: this.interestHash.toString(),
            proofSize: this.proofSize,
        };
    }
    static fromJSON(obj) {
        return new Deposit({
            depositType: types.DepositType.fromJSON(obj.depositType),
            format: types.DepositFormat.fromJSON(obj.format),
            interestHash: new BN(obj.interestHash),
            proofSize: obj.proofSize,
        });
    }
    toEncodable() {
        return Deposit.toEncodable(this);
    }
}
