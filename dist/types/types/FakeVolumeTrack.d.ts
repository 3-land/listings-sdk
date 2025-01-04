import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface FakeVolumeTrackFields {
    key: PublicKey;
    track: types.VolumeTrackFields;
}
export interface FakeVolumeTrackJSON {
    key: string;
    track: types.VolumeTrackJSON;
}
export declare class FakeVolumeTrack {
    readonly key: PublicKey;
    readonly track: types.VolumeTrack;
    constructor(fields: FakeVolumeTrackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.FakeVolumeTrack;
    static toEncodable(fields: FakeVolumeTrackFields): {
        key: PublicKey;
        track: {
            amount: BN;
            pieces: BN;
        };
    };
    toJSON(): FakeVolumeTrackJSON;
    static fromJSON(obj: FakeVolumeTrackJSON): FakeVolumeTrack;
    toEncodable(): {
        key: PublicKey;
        track: {
            amount: BN;
            pieces: BN;
        };
    };
}
//# sourceMappingURL=FakeVolumeTrack.d.ts.map