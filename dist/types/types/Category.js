import * as borsh from "@coral-xyz/borsh";
export class Category {
    constructor(fields) {
        this.cat1 = fields.cat1;
        this.cat2 = fields.cat2;
        this.cat3 = fields.cat3;
    }
    static layout(property) {
        return borsh.struct([borsh.u16("cat1"), borsh.u16("cat2"), borsh.u16("cat3")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Category({
            cat1: obj.cat1,
            cat2: obj.cat2,
            cat3: obj.cat3,
        });
    }
    static toEncodable(fields) {
        return {
            cat1: fields.cat1,
            cat2: fields.cat2,
            cat3: fields.cat3,
        };
    }
    toJSON() {
        return {
            cat1: this.cat1,
            cat2: this.cat2,
            cat3: this.cat3,
        };
    }
    static fromJSON(obj) {
        return new Category({
            cat1: obj.cat1,
            cat2: obj.cat2,
            cat3: obj.cat3,
        });
    }
    toEncodable() {
        return Category.toEncodable(this);
    }
}
