import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PROGRAM_ID } from "../../../types/programId";
import { StoreConfig } from "../../../types/types";
import { createStore } from "../../../types/instructions";

export function createStoreInstruction(
  holderAccount: PublicKey,
  storeAccount: PublicKey,
  creator: PublicKey,
  name: string,
  storeConfig: StoreConfig,
  storeId: number
): TransactionInstruction {
  return createStore(
    { name, storeConfig, storeId },
    { holderAccount, storeAccount, creator, systemProgram: PublicKey.default },
    PROGRAM_ID
  );
}
