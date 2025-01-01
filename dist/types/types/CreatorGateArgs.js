import { PublicKey } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh";
export class CreatorGateArgs {
    constructor(fields) {
        this.key = fields.key;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey("key")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CreatorGateArgs({
            key: obj.key,
        });
    }
    static toEncodable(fields) {
        return {
            key: fields.key,
        };
    }
    toJSON() {
        return {
            key: this.key.toString(),
        };
    }
    static fromJSON(obj) {
        return new CreatorGateArgs({
            key: new PublicKey(obj.key),
        });
    }
    toEncodable() {
        return CreatorGateArgs.toEncodable(this);
    }
}
