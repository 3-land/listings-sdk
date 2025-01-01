import * as borsh from "@coral-xyz/borsh";
export class SuperCategory {
    constructor(fields) {
        this.cat1 = fields.cat1;
        this.cat2 = fields.cat2;
    }
    static layout(property) {
        return borsh.struct([borsh.u8("cat1"), borsh.u8("cat2")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SuperCategory({
            cat1: obj.cat1,
            cat2: obj.cat2,
        });
    }
    static toEncodable(fields) {
        return {
            cat1: fields.cat1,
            cat2: fields.cat2,
        };
    }
    toJSON() {
        return {
            cat1: this.cat1,
            cat2: this.cat2,
        };
    }
    static fromJSON(obj) {
        return new SuperCategory({
            cat1: obj.cat1,
            cat2: obj.cat2,
        });
    }
    toEncodable() {
        return SuperCategory.toEncodable(this);
    }
}
