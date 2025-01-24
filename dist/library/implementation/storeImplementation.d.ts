import { CreateCollectionOptions, CreateSingleOptions, CreateStoreParams, StoreInitOptions } from "../../types/implementation/implementationTypes";
declare function createStoreImp(options: StoreInitOptions, storeSetup: CreateStoreParams): Promise<{
    transactionId: string;
    payerPublicKey: string;
}>;
declare function createCollectionImp(options: StoreInitOptions, collectionOpts: CreateCollectionOptions, priorityFeeParam?: number): Promise<string | {
    success: boolean;
    error: unknown;
}>;
declare function createSingleImp(options: StoreInitOptions, storeAccount: string, collectionAccount: string, createOptions: CreateSingleOptions, isAI: boolean, withPool?: boolean, priorityFeeParam?: number): Promise<{
    transactionId: string;
    payerPublicKey: string;
}>;
declare function buySingleImp(options: StoreInitOptions, item: string): Promise<{
    transactionId: string;
    ownerPublicKey: string;
}>;
declare function handleError(error: unknown): void;
export { createStoreImp, createCollectionImp, createSingleImp, buySingleImp, handleError, };
//# sourceMappingURL=storeImplementation.d.ts.map