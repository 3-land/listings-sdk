export interface StoreInitOptions {
    walletPath?: string;
    privateKey?: number[] | Uint8Array | string;
    isMainnet?: boolean;
    customRPC?: string;
}
export interface CreateStoreParams {
    storeName: string;
    storeFee: number;
}
export interface CreateCollectionOptions {
    collectionSymbol: string;
    collectionName: string;
    collectionDescription: string;
    mainImageUrl?: string;
    coverImageUrl?: string;
}
export interface CreateSingleOptions {
    itemName: string;
    sellerFee: number;
    itemAmount: number;
    itemSymbol: string;
    itemDescription: string;
    traits: any;
    price?: number;
    mainImageUrl?: string;
    coverImageUrl?: string;
    splHash?: string;
    poolName?: string;
}
//# sourceMappingURL=implementationTypes.d.ts.map