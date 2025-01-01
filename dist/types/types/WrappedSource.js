import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class WrappedSource {
    constructor(fields) {
        this.pool = fields.pool;
        this.amount = fields.amount;
        this.distribution = fields.distribution;
        this.track = fields.track;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("pool"),
            borsh.u64("amount"),
            borsh.u16("distribution"),
            borsh.u8("track"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new WrappedSource({
            pool: obj.pool,
            amount: obj.amount,
            distribution: obj.distribution,
            track: obj.track,
        });
    }
    static toEncodable(fields) {
        return {
            pool: fields.pool,
            amount: fields.amount,
            distribution: fields.distribution,
            track: fields.track,
        };
    }
    toJSON() {
        return {
            pool: this.pool.toString(),
            amount: this.amount.toString(),
            distribution: this.distribution,
            track: this.track,
        };
    }
    static fromJSON(obj) {
        return new WrappedSource({
            pool: new PublicKey(obj.pool),
            amount: new BN(obj.amount),
            distribution: obj.distribution,
            track: obj.track,
        });
    }
    toEncodable() {
        return WrappedSource.toEncodable(this);
    }
}
