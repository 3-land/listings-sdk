import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface IPGateJSON {
    kind: "IPGate";
}
export declare class IPGate {
    static readonly discriminator = 0;
    static readonly kind = "IPGate";
    readonly discriminator = 0;
    readonly kind = "IPGate";
    toJSON(): IPGateJSON;
    toEncodable(): {
        IPGate: {};
    };
}
export interface BiometricsGateJSON {
    kind: "BiometricsGate";
}
export declare class BiometricsGate {
    static readonly discriminator = 1;
    static readonly kind = "BiometricsGate";
    readonly discriminator = 1;
    readonly kind = "BiometricsGate";
    toJSON(): BiometricsGateJSON;
    toEncodable(): {
        BiometricsGate: {};
    };
}
export declare function fromDecoded(obj: any): types.AuthorityGateTypesKind;
export declare function fromJSON(obj: types.AuthorityGateTypesJSON): types.AuthorityGateTypesKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=AuthorityGateTypes.d.ts.map