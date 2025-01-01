import { PublicKey, Signer } from "@solana/web3.js";
import { StoreConfig, MetadataArgs, SaleConfig, ShortMetadataArgs } from "../types/types";
import { NetworkType, NetworkConfig } from "../utility/config";
export interface StoreOptions {
    network?: NetworkType;
    customEndpoint?: string;
    customConfig?: Partial<NetworkConfig>;
}
export declare class Store {
    private connection;
    private networkConfig;
    constructor(options?: StoreOptions);
    createStore(payer: Signer, name: string, storeConfig: StoreConfig, creator?: PublicKey, storeId?: number): Promise<string>;
    createCollection(payer: Signer, collectionDetails: any, metadata: any, irysData: any, mutable?: Boolean, supply?: number): Promise<string>;
    createSingleEdition(payer: Signer, storeAccount: PublicKey, supply: number, metadata: ShortMetadataArgs, saleConfig: SaleConfig, category: number[], superCategory: number[], eventCategory: number, hashTraits: number, collection: PublicKey, irysData: any): Promise<string>;
    buySingleEdition(payer: Signer, distributionBumps: number[], itemAddress: PublicKey, extraAccounts?: any[], globalStoreAccount?: PublicKey, packAccount?: PublicKey, burnProgress?: PublicKey, poolVault?: PublicKey): Promise<string>;
}
export { StoreConfig, MetadataArgs, SaleConfig };
