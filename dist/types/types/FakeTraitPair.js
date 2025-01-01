import * as borsh from "@coral-xyz/borsh";
export class FakeTraitPair {
    constructor(fields) {
        this.trait_type = fields.trait_type;
        this.value = fields.value;
    }
    static layout(property) {
        return borsh.struct([borsh.str("trait_type"), borsh.str("value")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FakeTraitPair({
            trait_type: obj.trait_type,
            value: obj.value,
        });
    }
    static toEncodable(fields) {
        return {
            trait_type: fields.trait_type,
            value: fields.value,
        };
    }
    toJSON() {
        return {
            trait_type: this.trait_type,
            value: this.value,
        };
    }
    static fromJSON(obj) {
        return new FakeTraitPair({
            trait_type: obj.trait_type,
            value: obj.value,
        });
    }
    toEncodable() {
        return FakeTraitPair.toEncodable(this);
    }
}
