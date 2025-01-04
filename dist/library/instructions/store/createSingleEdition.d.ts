import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { SaleConfig, ShortMetadataArgs } from "../../../types/types";
export declare function createSingleEditionInstruction(storeAccount: PublicKey, itemAccount: PublicKey, creatorAuthority: PublicKey, itemReserveList: PublicKey, creator: PublicKey, payer: PublicKey, supply: number, shortMetadata: ShortMetadataArgs, saleConfig: SaleConfig, identifier: number, category: number[], superCategory: number[], eventCategory: number, hashTraits: number): TransactionInstruction;
//# sourceMappingURL=createSingleEdition.d.ts.map