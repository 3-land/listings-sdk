import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { SaleConfig, ShortMetadataArgs } from "../../../types/types";
import BN from "bn.js";
type ExtraAccountMeta = {
    pubkey: PublicKey;
    isSigner: boolean;
    isWritable: boolean;
};
export declare function createSingleEditionInstruction(storeAccount: PublicKey, itemAccount: PublicKey, creatorAuthority: PublicKey, itemReserveList: PublicKey, creator: PublicKey, payer: PublicKey, supply: number, shortMetadata: ShortMetadataArgs, saleConfig: SaleConfig, identifier: number, category: number[], superCategory: number[], eventCategory: number, hashTraits: BN, extraAccounts?: ExtraAccountMeta[]): TransactionInstruction;
export {};
//# sourceMappingURL=createSingleEdition.d.ts.map