import { CreateCollectionOptions, CreateSingleOptions, CreateStoreParams, StoreInitOptions } from "../../types/implementation/implementationTypes";
declare function createStoreImp(options: StoreInitOptions, storeSetup: CreateStoreParams): Promise<{
    transactionId: string;
    payerPublicKey: any;
}>;
declare function createCollectionImp(options: StoreInitOptions, collectionOpts: CreateCollectionOptions): Promise<any>;
declare function createSingleImp(options: StoreInitOptions, storeAccount: string, collectionAccount: string, createOptions: CreateSingleOptions): Promise<{
    transactionId: string;
    payerPublicKey: any;
}>;
declare function buySingleImp(options: StoreInitOptions, item: string): Promise<{
    transactionId: string;
    ownerPublicKey: any;
}>;
declare function handleError(error: unknown): void;
export { createStoreImp, createCollectionImp, createSingleImp, buySingleImp, handleError, };
