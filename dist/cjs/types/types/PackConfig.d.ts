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
    static fromDecoded(obj: any): types.PackConfig;
    static toEncodable(fields: PackConfigFields): {
        amountPerPack: number;
        chancesOfEmpty: number;
        openAuthority: PublicKey;
        packType: {
            RandomDirect: {};
        } | {
            RandomPack: {};
        } | {
            Bundle: {};
        };
        packRules: {
            CoolDownToOpen: {
                seconds: number;
            };
        }[];
    };
    toJSON(): PackConfigJSON;
    static fromJSON(obj: PackConfigJSON): PackConfig;
    toEncodable(): {
        amountPerPack: number;
        chancesOfEmpty: number;
        openAuthority: PublicKey;
        packType: {
            RandomDirect: {};
        } | {
            RandomPack: {};
        } | {
            Bundle: {};
        };
        packRules: {
            CoolDownToOpen: {
                seconds: number;
            };
        }[];
    };
}
//# sourceMappingURL=PackConfig.d.ts.map