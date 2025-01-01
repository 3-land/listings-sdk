import * as borsh from "@coral-xyz/borsh";
export class TotalPerTimeWalletArgs {
    constructor(fields) {
        this.amount = fields.amount;
        this.time = fields.time;
    }
    static layout(property) {
        return borsh.struct([borsh.u16("amount"), borsh.u32("time")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TotalPerTimeWalletArgs({
            amount: obj.amount,
            time: obj.time,
        });
    }
    static toEncodable(fields) {
        return {
            amount: fields.amount,
            time: fields.time,
        };
    }
    toJSON() {
        return {
            amount: this.amount,
            time: this.time,
        };
    }
    static fromJSON(obj) {
        return new TotalPerTimeWalletArgs({
            amount: obj.amount,
            time: obj.time,
        });
    }
    toEncodable() {
        return TotalPerTimeWalletArgs.toEncodable(this);
    }
}
