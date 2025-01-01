import * as borsh from "@coral-xyz/borsh";
export class ZeroConfig {
    constructor(fields) {
        this.bytes = fields.bytes;
        this.chunks = fields.chunks;
        this.chunkSize = fields.chunkSize;
        this.supplyChunkBytes = fields.supplyChunkBytes;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8("bytes"),
            borsh.array(borsh.u8(), 2, "chunks"),
            borsh.u8("chunkSize"),
            borsh.u8("supplyChunkBytes"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ZeroConfig({
            bytes: obj.bytes,
            chunks: obj.chunks,
            chunkSize: obj.chunkSize,
            supplyChunkBytes: obj.supplyChunkBytes,
        });
    }
    static toEncodable(fields) {
        return {
            bytes: fields.bytes,
            chunks: fields.chunks,
            chunkSize: fields.chunkSize,
            supplyChunkBytes: fields.supplyChunkBytes,
        };
    }
    toJSON() {
        return {
            bytes: this.bytes,
            chunks: this.chunks,
            chunkSize: this.chunkSize,
            supplyChunkBytes: this.supplyChunkBytes,
        };
    }
    static fromJSON(obj) {
        return new ZeroConfig({
            bytes: obj.bytes,
            chunks: obj.chunks,
            chunkSize: obj.chunkSize,
            supplyChunkBytes: obj.supplyChunkBytes,
        });
    }
    toEncodable() {
        return ZeroConfig.toEncodable(this);
    }
}
