import * as borsh from "@coral-xyz/borsh";
export class CnftData {
    constructor(fields) {
        this.root = fields.root;
        this.dataHash = fields.dataHash;
        this.creatorHash = fields.creatorHash;
        this.index = fields.index;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 32, "root"),
            borsh.array(borsh.u8(), 32, "dataHash"),
            borsh.array(borsh.u8(), 32, "creatorHash"),
            borsh.u32("index"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CnftData({
            root: obj.root,
            dataHash: obj.dataHash,
            creatorHash: obj.creatorHash,
            index: obj.index,
        });
    }
    static toEncodable(fields) {
        return {
            root: fields.root,
            dataHash: fields.dataHash,
            creatorHash: fields.creatorHash,
            index: fields.index,
        };
    }
    toJSON() {
        return {
            root: this.root,
            dataHash: this.dataHash,
            creatorHash: this.creatorHash,
            index: this.index,
        };
    }
    static fromJSON(obj) {
        return new CnftData({
            root: obj.root,
            dataHash: obj.dataHash,
            creatorHash: obj.creatorHash,
            index: obj.index,
        });
    }
    toEncodable() {
        return CnftData.toEncodable(this);
    }
}
