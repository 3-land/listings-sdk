import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface SecureHolderFields {
    class: types.AccountClassKind;
    payload: types.EncryptedPayloadFields;
}
export interface SecureHolderJSON {
    class: types.AccountClassJSON;
    payload: types.EncryptedPayloadJSON;
}
export declare class SecureHolder {
    readonly class: types.AccountClassKind;
    readonly payload: types.EncryptedPayload;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: SecureHolderFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<SecureHolder | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<SecureHolder | null>>;
    static decode(data: Buffer): SecureHolder;
    toJSON(): SecureHolderJSON;
    static fromJSON(obj: SecureHolderJSON): SecureHolder;
}
//# sourceMappingURL=SecureHolder.d.ts.map