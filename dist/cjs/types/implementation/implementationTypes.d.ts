export interface StoreInitOptions {
    walletPath?: string;
    privateKey?: number[] | Uint8Array | string;
}
export interface CreateStoreParams {
    storeName: string;
    storeFee: number;
}
export interface CreateCollectionOptions {
    collectionSymbol: string;
    collectionName: string;
    collectionDescription: string;
}
export interface CreateSingleOptions {
    itemName: string;
    sellerFee: number;
    itemSymbol: string;
    itemDescription: string;
    traits: any;
    price: number;
    mainImageUrl?: string;
    coverImageUrl?: string;
}
//# sourceMappingURL=implementationTypes.d.ts.map