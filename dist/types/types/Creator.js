import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class Creator {
    constructor(fields) {
        this.address = fields.address;
        this.verified = fields.verified;
        this.share = fields.share;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey("address"), borsh.bool("verified"), borsh.u8("share")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Creator({
            address: obj.address,
            verified: obj.verified,
            share: obj.share,
        });
    }
    static toEncodable(fields) {
        return {
            address: fields.address,
            verified: fields.verified,
            share: fields.share,
        };
    }
    toJSON() {
        return {
            address: this.address.toString(),
            verified: this.verified,
            share: this.share,
        };
    }
    static fromJSON(obj) {
        return new Creator({
            address: new PublicKey(obj.address),
            verified: obj.verified,
            share: obj.share,
        });
    }
    toEncodable() {
        return Creator.toEncodable(this);
    }
}
