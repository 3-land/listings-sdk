import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface BurnDepositFields {
    class: types.AccountClassKind;
    deposits: Array<types.FakeDepositFields>;
}
export interface BurnDepositJSON {
    class: types.AccountClassJSON;
    deposits: Array<types.FakeDepositJSON>;
}
export declare class BurnDeposit {
    readonly class: types.AccountClassKind;
    readonly deposits: Array<types.FakeDeposit>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: BurnDepositFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<BurnDeposit | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<BurnDeposit | null>>;
    static decode(data: Buffer): BurnDeposit;
    toJSON(): BurnDepositJSON;
    static fromJSON(obj: BurnDepositJSON): BurnDeposit;
}
//# sourceMappingURL=BurnDeposit.d.ts.map