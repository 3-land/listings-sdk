import BN from "bn.js";
import * as types from "../types";
export interface VolumeTrackFields {
    amount: BN;
    pieces: BN;
}
export interface VolumeTrackJSON {
    amount: string;
    pieces: string;
}
export declare class VolumeTrack {
    readonly amount: BN;
    readonly pieces: BN;
    constructor(fields: VolumeTrackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VolumeTrack;
    static toEncodable(fields: VolumeTrackFields): {
        amount: BN;
        pieces: BN;
    };
    toJSON(): VolumeTrackJSON;
    static fromJSON(obj: VolumeTrackJSON): VolumeTrack;
    toEncodable(): {
        amount: BN;
        pieces: BN;
    };
}
//# sourceMappingURL=VolumeTrack.d.ts.map