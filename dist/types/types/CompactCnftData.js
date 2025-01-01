import * as borsh from "@coral-xyz/borsh";
export class CompactCnftData {
    constructor(fields) {
        this.root = fields.root;
        this.arweave = fields.arweave;
        this.index = fields.index;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 32, "root"),
            borsh.str("arweave"),
            borsh.u32("index"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CompactCnftData({
            root: obj.root,
            arweave: obj.arweave,
            index: obj.index,
        });
    }
    static toEncodable(fields) {
        return {
            root: fields.root,
            arweave: fields.arweave,
            index: fields.index,
        };
    }
    toJSON() {
        return {
            root: this.root,
            arweave: this.arweave,
            index: this.index,
        };
    }
    static fromJSON(obj) {
        return new CompactCnftData({
            root: obj.root,
            arweave: obj.arweave,
            index: obj.index,
        });
    }
    toEncodable() {
        return CompactCnftData.toEncodable(this);
    }
}
