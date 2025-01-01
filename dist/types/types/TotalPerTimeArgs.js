import * as borsh from "@coral-xyz/borsh";
export class TotalPerTimeArgs {
    constructor(fields) {
        this.count = fields.count;
        this.amount = fields.amount;
        this.time = fields.time;
        this.lastTimeReset = fields.lastTimeReset;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u16("count"),
            borsh.u16("amount"),
            borsh.u32("time"),
            borsh.u32("lastTimeReset"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TotalPerTimeArgs({
            count: obj.count,
            amount: obj.amount,
            time: obj.time,
            lastTimeReset: obj.lastTimeReset,
        });
    }
    static toEncodable(fields) {
        return {
            count: fields.count,
            amount: fields.amount,
            time: fields.time,
            lastTimeReset: fields.lastTimeReset,
        };
    }
    toJSON() {
        return {
            count: this.count,
            amount: this.amount,
            time: this.time,
            lastTimeReset: this.lastTimeReset,
        };
    }
    static fromJSON(obj) {
        return new TotalPerTimeArgs({
            count: obj.count,
            amount: obj.amount,
            time: obj.time,
            lastTimeReset: obj.lastTimeReset,
        });
    }
    toEncodable() {
        return TotalPerTimeArgs.toEncodable(this);
    }
}
