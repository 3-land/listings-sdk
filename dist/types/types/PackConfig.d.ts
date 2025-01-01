import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface PackConfigFields {
    amountPerPack: number;
    chancesOfEmpty: number;
    openAuthority: PublicKey;
    packType: types.PackTypeKind;
    packRules: Array<types.PackRuleKind>;
}
export interface PackConfigJSON {
    amountPerPack: number;
    chancesOfEmpty: number;
    openAuthority: string;
    packType: types.PackTypeJSON;
    packRules: Array<types.PackRuleJSON>;
}
export declare class PackConfig {
    readonly amountPerPack: number;
    readonly chancesOfEmpty: number;
    readonly openAuthority: PublicKey;
    readonly packType: types.PackTypeKind;
    readonly packRules: Array<types.PackRuleKind>;
    constructor(fields: PackConfigFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): PackConfig;
    static toEncodable(fields: PackConfigFields): {
        amountPerPack: number;
        chancesOfEmpty: number;
        openAuthority: PublicKey;
        packType: any;
        packRules: any[];
    };
    toJSON(): PackConfigJSON;
    static fromJSON(obj: PackConfigJSON): PackConfig;
    toEncodable(): {
        amountPerPack: number;
        chancesOfEmpty: number;
        openAuthority: PublicKey;
        packType: any;
        packRules: any[];
    };
}
