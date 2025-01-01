import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "../../../types/programId";
import { createStore } from "../../../types/instructions";
export function createStoreInstruction(holderAccount, storeAccount, creator, name, storeConfig, storeId) {
    return createStore({ name, storeConfig, storeId }, { holderAccount, storeAccount, creator, systemProgram: PublicKey.default }, PROGRAM_ID);
}
