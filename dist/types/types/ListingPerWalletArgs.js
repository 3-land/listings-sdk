import * as borsh from "@coral-xyz/borsh";
export class ListingPerWalletArgs {
    constructor(fields) {
        this.amount = fields.amount;
    }
    static layout(property) {
        return borsh.struct([borsh.u16("amount")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ListingPerWalletArgs({
            amount: obj.amount,
        });
    }
    static toEncodable(fields) {
        return {
            amount: fields.amount,
        };
    }
    toJSON() {
        return {
            amount: this.amount,
        };
    }
    static fromJSON(obj) {
        return new ListingPerWalletArgs({
            amount: obj.amount,
        });
    }
    toEncodable() {
        return ListingPerWalletArgs.toEncodable(this);
    }
}
