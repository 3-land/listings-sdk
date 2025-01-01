import * as borsh from "@coral-xyz/borsh";
export class CoolTimePerAmountArgs {
    constructor(fields) {
        this.count = fields.count;
        this.amount = fields.amount;
        this.time = fields.time;
    }
    static layout(property) {
        return borsh.struct([borsh.u16("count"), borsh.u16("amount"), borsh.u32("time")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CoolTimePerAmountArgs({
            count: obj.count,
            amount: obj.amount,
            time: obj.time,
        });
    }
    static toEncodable(fields) {
        return {
            count: fields.count,
            amount: fields.amount,
            time: fields.time,
        };
    }
    toJSON() {
        return {
            count: this.count,
            amount: this.amount,
            time: this.time,
        };
    }
    static fromJSON(obj) {
        return new CoolTimePerAmountArgs({
            count: obj.count,
            amount: obj.amount,
            time: obj.time,
        });
    }
    toEncodable() {
        return CoolTimePerAmountArgs.toEncodable(this);
    }
}
