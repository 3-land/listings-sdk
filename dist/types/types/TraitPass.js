import * as types from "../types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class TraitPass {
    constructor(fields) {
        this.list = fields.list;
    }
    static layout(property) {
        return borsh.struct([borsh.vec(types.TraitPassType.layout(), "list")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TraitPass({
            list: obj.list.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.TraitPassType.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            list: fields.list.map((item) => item.toEncodable()),
        };
    }
    toJSON() {
        return {
            list: this.list.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new TraitPass({
            list: obj.list.map((item) => types.TraitPassType.fromJSON(item)),
        });
    }
    toEncodable() {
        return TraitPass.toEncodable(this);
    }
}
