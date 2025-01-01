import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface PackTraitsFields {
    class: types.AccountClassKind;
    list: Array<types.TraitTypeKind>;
}
export interface PackTraitsJSON {
    class: types.AccountClassJSON;
    list: Array<types.TraitTypeJSON>;
}
export declare class PackTraits {
    readonly class: types.AccountClassKind;
    readonly list: Array<types.TraitTypeKind>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: PackTraitsFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<PackTraits | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<PackTraits | null>>;
    static decode(data: Buffer): PackTraits;
    toJSON(): PackTraitsJSON;
    static fromJSON(obj: PackTraitsJSON): PackTraits;
}
//# sourceMappingURL=PackTraits.d.ts.map