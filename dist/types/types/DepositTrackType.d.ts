import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface CreatorJSON {
    kind: "Creator";
}
export declare class Creator {
    static readonly discriminator = 0;
    static readonly kind = "Creator";
    readonly discriminator = 0;
    readonly kind = "Creator";
    toJSON(): CreatorJSON;
    toEncodable(): {
        Creator: {};
    };
}
export interface PdaCreatorJSON {
    kind: "PdaCreator";
}
export declare class PdaCreator {
    static readonly discriminator = 1;
    static readonly kind = "PdaCreator";
    readonly discriminator = 1;
    readonly kind = "PdaCreator";
    toJSON(): PdaCreatorJSON;
    toEncodable(): {
        PdaCreator: {};
    };
}
export declare function fromDecoded(obj: any): types.DepositTrackTypeKind;
export declare function fromJSON(obj: types.DepositTrackTypeJSON): types.DepositTrackTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=DepositTrackType.d.ts.map