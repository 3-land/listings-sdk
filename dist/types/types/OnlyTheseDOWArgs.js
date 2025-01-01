import * as borsh from "@coral-xyz/borsh";
export class OnlyTheseDOWArgs {
    constructor(fields) {
        this.days = fields.days;
    }
    static layout(property) {
        return borsh.struct([borsh.u8("days")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OnlyTheseDOWArgs({
            days: obj.days,
        });
    }
    static toEncodable(fields) {
        return {
            days: fields.days,
        };
    }
    toJSON() {
        return {
            days: this.days,
        };
    }
    static fromJSON(obj) {
        return new OnlyTheseDOWArgs({
            days: obj.days,
        });
    }
    toEncodable() {
        return OnlyTheseDOWArgs.toEncodable(this);
    }
}
