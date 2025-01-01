import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class ShortCreator {
    constructor(fields) {
        this.address = fields.address;
        this.share = fields.share;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey("address"), borsh.u8("share")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ShortCreator({
            address: obj.address,
            share: obj.share,
        });
    }
    static toEncodable(fields) {
        return {
            address: fields.address,
            share: fields.share,
        };
    }
    toJSON() {
        return {
            address: this.address.toString(),
            share: this.share,
        };
    }
    static fromJSON(obj) {
        return new ShortCreator({
            address: new PublicKey(obj.address),
            share: obj.share,
        });
    }
    toEncodable() {
        return ShortCreator.toEncodable(this);
    }
}
