import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface PaymentV1JSON {
    kind: "PaymentV1";
}
export declare class PaymentV1 {
    static readonly discriminator = 0;
    static readonly kind = "PaymentV1";
    readonly discriminator = 0;
    readonly kind = "PaymentV1";
    toJSON(): PaymentV1JSON;
    toEncodable(): {
        PaymentV1: {};
    };
}
export interface BurnPaymentV1JSON {
    kind: "BurnPaymentV1";
}
export declare class BurnPaymentV1 {
    static readonly discriminator = 1;
    static readonly kind = "BurnPaymentV1";
    readonly discriminator = 1;
    readonly kind = "BurnPaymentV1";
    toJSON(): BurnPaymentV1JSON;
    toEncodable(): {
        BurnPaymentV1: {};
    };
}
export interface GatePaymentV1JSON {
    kind: "GatePaymentV1";
}
export declare class GatePaymentV1 {
    static readonly discriminator = 2;
    static readonly kind = "GatePaymentV1";
    readonly discriminator = 2;
    readonly kind = "GatePaymentV1";
    toJSON(): GatePaymentV1JSON;
    toEncodable(): {
        GatePaymentV1: {};
    };
}
export declare function fromDecoded(obj: any): types.PaymentClassKind;
export declare function fromJSON(obj: types.PaymentClassJSON): types.PaymentClassKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=PaymentClass.d.ts.map