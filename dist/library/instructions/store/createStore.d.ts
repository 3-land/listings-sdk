import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { StoreConfig } from "../../../types/types";
export declare function createStoreInstruction(holderAccount: PublicKey, storeAccount: PublicKey, creator: PublicKey, name: string, storeConfig: StoreConfig, storeId: number): TransactionInstruction;
//# sourceMappingURL=createStore.d.ts.map