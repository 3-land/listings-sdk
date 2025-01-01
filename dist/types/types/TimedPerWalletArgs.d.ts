export interface TimedPerWalletArgsFields {
    amount: number;
}
export interface TimedPerWalletArgsJSON {
    amount: number;
}
export declare class TimedPerWalletArgs {
    readonly amount: number;
    constructor(fields: TimedPerWalletArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): TimedPerWalletArgs;
    static toEncodable(fields: TimedPerWalletArgsFields): {
        amount: number;
    };
    toJSON(): TimedPerWalletArgsJSON;
    static fromJSON(obj: TimedPerWalletArgsJSON): TimedPerWalletArgs;
    toEncodable(): {
        amount: number;
    };
}
