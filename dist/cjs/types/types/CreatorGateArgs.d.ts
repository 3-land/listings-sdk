import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface CreatorGateArgsFields {
    key: PublicKey;
}
export interface CreatorGateArgsJSON {
    key: string;
}
export declare class CreatorGateArgs {
    readonly key: PublicKey;
    constructor(fields: CreatorGateArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CreatorGateArgs;
    static toEncodable(fields: CreatorGateArgsFields): {
        key: PublicKey;
    };
    toJSON(): CreatorGateArgsJSON;
    static fromJSON(obj: CreatorGateArgsJSON): CreatorGateArgs;
    toEncodable(): {
        key: PublicKey;
    };
}
//# sourceMappingURL=CreatorGateArgs.d.ts.map