export interface StoreInitOptions {
  // Make walletPath optional
  walletPath?: string;
  // Add privateKey option - can be array of numbers, Uint8Array, or base58 string
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
