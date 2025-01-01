import * as borsh from "@coral-xyz/borsh";
export class AllowedCurrencyArgs {
    constructor(fields) {
        this.id = fields.id;
    }
    static layout(property) {
        return borsh.struct([borsh.u16("id")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AllowedCurrencyArgs({
            id: obj.id,
        });
    }
    static toEncodable(fields) {
        return {
            id: fields.id,
        };
    }
    toJSON() {
        return {
            id: this.id,
        };
    }
    static fromJSON(obj) {
        return new AllowedCurrencyArgs({
            id: obj.id,
        });
    }
    toEncodable() {
        return AllowedCurrencyArgs.toEncodable(this);
    }
}
