import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Collection {
    constructor(fields) {
        this.verified = fields.verified;
        this.key = fields.key;
    }
    static layout(property) {
        return borsh.struct([borsh.bool("verified"), borsh.publicKey("key")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Collection({
            verified: obj.verified,
            key: obj.key,
        });
    }
    static toEncodable(fields) {
        return {
            verified: fields.verified,
            key: fields.key,
        };
    }
    toJSON() {
        return {
            verified: this.verified,
            key: this.key.toString(),
        };
    }
    static fromJSON(obj) {
        return new Collection({
            verified: obj.verified,
            key: new PublicKey(obj.key),
        });
    }
    toEncodable() {
        return Collection.toEncodable(this);
    }
}
