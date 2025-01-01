import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface NoTrackJSON {
    kind: "NoTrack";
}
export declare class NoTrack {
    static readonly discriminator = 0;
    static readonly kind = "NoTrack";
    readonly discriminator = 0;
    readonly kind = "NoTrack";
    toJSON(): NoTrackJSON;
    toEncodable(): {
        NoTrack: {};
    };
}
export interface TrackedJSON {
    kind: "Tracked";
}
export declare class Tracked {
    static readonly discriminator = 1;
    static readonly kind = "Tracked";
    readonly discriminator = 1;
    readonly kind = "Tracked";
    toJSON(): TrackedJSON;
    toEncodable(): {
        Tracked: {};
    };
}
export declare function fromDecoded(obj: any): types.TrackRegistryKind;
export declare function fromJSON(obj: types.TrackRegistryJSON): types.TrackRegistryKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=TrackRegistry.d.ts.map