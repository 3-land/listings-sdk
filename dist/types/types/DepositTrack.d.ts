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
    static fromDecoded(obj: any): types.DepositTrack;
    static toEncodable(fields: DepositTrackFields): {
        depositTrackType: {
            Creator: {};
        } | {
            PdaCreator: {};
        };
        depositState: {
            Available: {};
        } | {
            Burning: {};
        };
    };
    toJSON(): DepositTrackJSON;
    static fromJSON(obj: DepositTrackJSON): DepositTrack;
    toEncodable(): {
        depositTrackType: {
            Creator: {};
        } | {
            PdaCreator: {};
        };
        depositState: {
            Available: {};
        } | {
            Burning: {};
        };
    };
}
//# sourceMappingURL=DepositTrack.d.ts.map