import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface PaymentFields {
    class: types.PaymentClassKind;
    hash: Array<number>;
}
export interface PaymentJSON {
    class: types.PaymentClassJSON;
    hash: Array<number>;
}
export declare class Payment {
    readonly class: types.PaymentClassKind;
    readonly hash: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: PaymentFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<Payment | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<Payment | null>>;
    static decode(data: Buffer): Payment;
    toJSON(): PaymentJSON;
    static fromJSON(obj: PaymentJSON): Payment;
}
//# sourceMappingURL=Payment.d.ts.map