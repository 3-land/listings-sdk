import { PublicKey } from "@solana/web3.js";
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
    static fromDecoded(obj: any): FakeVolumeTrack;
    static toEncodable(fields: FakeVolumeTrackFields): {
        key: PublicKey;
        track: any;
    };
    toJSON(): FakeVolumeTrackJSON;
    static fromJSON(obj: FakeVolumeTrackJSON): FakeVolumeTrack;
    toEncodable(): {
        key: PublicKey;
        track: any;
    };
}
