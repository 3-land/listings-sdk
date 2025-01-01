import BN from "bn.js";
import * as types from "../types";
export interface TraitPassFields {
    list: Array<types.TraitPassTypeKind>;
}
export interface TraitPassJSON {
    list: Array<types.TraitPassTypeJSON>;
}
export declare class TraitPass {
    readonly list: Array<types.TraitPassTypeKind>;
    constructor(fields: TraitPassFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TraitPass;
    static toEncodable(fields: TraitPassFields): {
        list: ({
            SemiFungible: {
                typeId: number;
                amount: BN;
            };
        } | {
            Date: {
                typeId: number;
                date: number;
            };
        } | {
            NonFungible: {
                typeId: number;
                valueId: number;
            };
        })[];
    };
    toJSON(): TraitPassJSON;
    static fromJSON(obj: TraitPassJSON): TraitPass;
    toEncodable(): {
        list: ({
            SemiFungible: {
                typeId: number;
                amount: BN;
            };
        } | {
            Date: {
                typeId: number;
                date: number;
            };
        } | {
            NonFungible: {
                typeId: number;
                valueId: number;
            };
        })[];
    };
}
//# sourceMappingURL=TraitPass.d.ts.map