import * as types from "../types";
export interface ListingPerWalletArgsFields {
    amount: number;
}
export interface ListingPerWalletArgsJSON {
    amount: number;
}
export declare class ListingPerWalletArgs {
    readonly amount: number;
    constructor(fields: ListingPerWalletArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ListingPerWalletArgs;
    static toEncodable(fields: ListingPerWalletArgsFields): {
        amount: number;
    };
    toJSON(): ListingPerWalletArgsJSON;
    static fromJSON(obj: ListingPerWalletArgsJSON): ListingPerWalletArgs;
    toEncodable(): {
        amount: number;
    };
}
//# sourceMappingURL=ListingPerWalletArgs.d.ts.map