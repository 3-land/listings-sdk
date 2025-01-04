import { PublicKey, Signer } from "@solana/web3.js";
import { StoreConfig, SaleConfig, ShortMetadataArgs } from "../types/types";
export declare class ValidationError extends Error {
    constructor(message: string);
}
export declare function validateStoreConfig(config: StoreConfig): void;
export declare function validateMetadata(metadata: ShortMetadataArgs): void;
export declare function validateSaleConfig(config: SaleConfig): void;
export declare function validateSupply(supply: number): void;
export declare function validateIdentifier(identifier: number): void;
export declare function validateCollectionArgs(collectionDetails: any, supply: number, metadata: any, irysData: any): void;
export declare function validateBuySingleArgs(payer: Signer, packAccount: PublicKey, burnProgress: PublicKey, owner: PublicKey, distributionBumps: number[], globalStoreAccount: PublicKey, extraAccounts: any[], collectionAddress?: PublicKey, storeAccount?: PublicKey, creator?: PublicKey): void;
//# sourceMappingURL=validation.d.ts.map