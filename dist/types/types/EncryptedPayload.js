import * as borsh from "@coral-xyz/borsh";
export class EncryptedPayload {
    constructor(fields) {
        this.encType = fields.encType;
        this.arweave = fields.arweave;
    }
    static layout(property) {
        return borsh.struct([borsh.u8("encType"), borsh.str("arweave")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new EncryptedPayload({
            encType: obj.encType,
            arweave: obj.arweave,
        });
    }
    static toEncodable(fields) {
        return {
            encType: fields.encType,
            arweave: fields.arweave,
        };
    }
    toJSON() {
        return {
            encType: this.encType,
            arweave: this.arweave,
        };
    }
    static fromJSON(obj) {
        return new EncryptedPayload({
            encType: obj.encType,
            arweave: obj.arweave,
        });
    }
    toEncodable() {
        return EncryptedPayload.toEncodable(this);
    }
}
