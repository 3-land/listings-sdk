import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class SaleTrack {
    constructor(fields) {
        this.created = fields.created;
        this.sold = fields.sold;
        this.earned = fields.earned;
        this.collectors = fields.collectors;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("created"),
            borsh.u64("sold"),
            borsh.u64("earned"),
            borsh.u64("collectors"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SaleTrack({
            created: obj.created,
            sold: obj.sold,
            earned: obj.earned,
            collectors: obj.collectors,
        });
    }
    static toEncodable(fields) {
        return {
            created: fields.created,
            sold: fields.sold,
            earned: fields.earned,
            collectors: fields.collectors,
        };
    }
    toJSON() {
        return {
            created: this.created.toString(),
            sold: this.sold.toString(),
            earned: this.earned.toString(),
            collectors: this.collectors.toString(),
        };
    }
    static fromJSON(obj) {
        return new SaleTrack({
            created: new BN(obj.created),
            sold: new BN(obj.sold),
            earned: new BN(obj.earned),
            collectors: new BN(obj.collectors),
        });
    }
    toEncodable() {
        return SaleTrack.toEncodable(this);
    }
}
