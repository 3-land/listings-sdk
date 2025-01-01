import * as types from "../types";
export interface DepositTrackFields {
    depositTrackType: types.DepositTrackTypeKind;
    depositState: types.DepositStateKind;
}
export interface DepositTrackJSON {
    depositTrackType: types.DepositTrackTypeJSON;
    depositState: types.DepositStateJSON;
}
export declare class DepositTrack {
    readonly depositTrackType: types.DepositTrackTypeKind;
    readonly depositState: types.DepositStateKind;
    constructor(fields: DepositTrackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): DepositTrack;
    static toEncodable(fields: DepositTrackFields): {
        depositTrackType: any;
        depositState: any;
    };
    toJSON(): DepositTrackJSON;
    static fromJSON(obj: DepositTrackJSON): DepositTrack;
    toEncodable(): {
        depositTrackType: any;
        depositState: any;
    };
}
