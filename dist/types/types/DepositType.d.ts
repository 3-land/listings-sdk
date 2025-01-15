import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type CreatorFields = {
    creators: Array<types.CreatorFields>;
};
export type CreatorValue = {
    creators: Array<types.Creator>;
};
export interface CreatorJSON {
    kind: "Creator";
    value: {
        creators: Array<types.CreatorJSON>;
    };
}
export declare class Creator {
    static readonly discriminator = 0;
    static readonly kind = "Creator";
    readonly discriminator = 0;
    readonly kind = "Creator";
    readonly value: CreatorValue;
    constructor(value: CreatorFields);
    toJSON(): CreatorJSON;
    toEncodable(): {
        Creator: {
            creators: {
                address: PublicKey;
                verified: boolean;
                share: number;
            }[];
        };
    };
}
export type PdaCreatorFields = {
    creators: Array<types.CreatorFields>;
    hasher: types.AccountHasherFields;
};
export type PdaCreatorValue = {
    creators: Array<types.Creator>;
    hasher: types.AccountHasher;
};
export interface PdaCreatorJSON {
    kind: "PdaCreator";
    value: {
        creators: Array<types.CreatorJSON>;
        hasher: types.AccountHasherJSON;
    };
}
export declare class PdaCreator {
    static readonly discriminator = 1;
    static readonly kind = "PdaCreator";
    readonly discriminator = 1;
    readonly kind = "PdaCreator";
    readonly value: PdaCreatorValue;
    constructor(value: PdaCreatorFields);
    toJSON(): PdaCreatorJSON;
    toEncodable(): {
        PdaCreator: {
            creators: {
                address: PublicKey;
                verified: boolean;
                share: number;
            }[];
            hasher: {
                seeds: {
                    seed: Buffer;
                }[];
                insertAt: number;
                program: PublicKey;
                bump: number;
            };
        };
    };
}
export declare function fromDecoded(obj: any): types.DepositTypeKind;
export declare function fromJSON(obj: types.DepositTypeJSON): types.DepositTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=DepositType.d.ts.map