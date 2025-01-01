import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class CollectTrack {
    constructor(fields) {
        this.collected = fields.collected;
        this.spent = fields.spent;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("collected"), borsh.u64("spent")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CollectTrack({
            collected: obj.collected,
            spent: obj.spent,
        });
    }
    static toEncodable(fields) {
        return {
            collected: fields.collected,
            spent: fields.spent,
        };
    }
    toJSON() {
        return {
            collected: this.collected.toString(),
            spent: this.spent.toString(),
        };
    }
    static fromJSON(obj) {
        return new CollectTrack({
            collected: new BN(obj.collected),
            spent: new BN(obj.spent),
        });
    }
    toEncodable() {
        return CollectTrack.toEncodable(this);
    }
}
