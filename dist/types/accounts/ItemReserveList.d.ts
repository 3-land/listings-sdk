import { PublicKey, Connection } from "@solana/web3.js";
export interface ItemReserveListFields {
    queue: PublicKey;
}
export interface ItemReserveListJSON {
    queue: string;
}
export declare class ItemReserveList {
    readonly queue: PublicKey;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: ItemReserveListFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ItemReserveList | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ItemReserveList | null>>;
    static decode(data: Buffer): ItemReserveList;
    toJSON(): ItemReserveListJSON;
    static fromJSON(obj: ItemReserveListJSON): ItemReserveList;
}
//# sourceMappingURL=ItemReserveList.d.ts.map