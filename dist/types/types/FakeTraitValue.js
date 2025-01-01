import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class FakeTraitValue {
    constructor(fields) {
        this.trait_value = fields.trait_value;
        this.state = fields.state;
    }
    static layout(property) {
        return borsh.struct([borsh.u64("trait_value"), borsh.u8("state")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FakeTraitValue({
            trait_value: obj.trait_value,
            state: obj.state,
        });
    }
    static toEncodable(fields) {
        return {
            trait_value: fields.trait_value,
            state: fields.state,
        };
    }
    toJSON() {
        return {
            trait_value: this.trait_value.toString(),
            state: this.state,
        };
    }
    static fromJSON(obj) {
        return new FakeTraitValue({
            trait_value: new BN(obj.trait_value),
            state: obj.state,
        });
    }
    toEncodable() {
        return FakeTraitValue.toEncodable(this);
    }
}
