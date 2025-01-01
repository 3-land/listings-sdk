import * as borsh from "@coral-xyz/borsh";
export class TokenMetadata {
    constructor(fields) {
        this.name = fields.name;
        this.symbol = fields.symbol;
        this.arweave = fields.arweave;
    }
    static layout(property) {
        return borsh.struct([borsh.str("name"), borsh.str("symbol"), borsh.str("arweave")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TokenMetadata({
            name: obj.name,
            symbol: obj.symbol,
            arweave: obj.arweave,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            symbol: fields.symbol,
            arweave: fields.arweave,
        };
    }
    toJSON() {
        return {
            name: this.name,
            symbol: this.symbol,
            arweave: this.arweave,
        };
    }
    static fromJSON(obj) {
        return new TokenMetadata({
            name: obj.name,
            symbol: obj.symbol,
            arweave: obj.arweave,
        });
    }
    toEncodable() {
        return TokenMetadata.toEncodable(this);
    }
}
