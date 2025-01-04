import { PublicKey, Connection } from "@solana/web3.js";
export interface ItemReserveList2Fields {
}
export interface ItemReserveList2JSON {
}
export declare class ItemReserveList2 {
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: ItemReserveList2Fields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ItemReserveList2 | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ItemReserveList2 | null>>;
    static decode(data: Buffer): ItemReserveList2;
    toJSON(): ItemReserveList2JSON;
    static fromJSON(obj: ItemReserveList2JSON): ItemReserveList2;
}
//# sourceMappingURL=ItemReserveList2.d.ts.map