import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PROGRAM_ID } from "../../../types/programId";
import {
  MetadataArgs,
  SaleConfig,
  ShortMetadataArgs,
} from "../../../types/types";
import { createSingle } from "../../../types/instructions";
import BN from "bn.js";

export function createSingleEditionInstruction(
  storeAccount: PublicKey,
  itemAccount: PublicKey,
  creatorAuthority: PublicKey,
  itemReserveList: PublicKey,
  creator: PublicKey,
  payer: PublicKey,
  supply: number,
  shortMetadata: ShortMetadataArgs,
  saleConfig: SaleConfig,
  identifier: number,
  category: number[],
  superCategory: number[],
  eventCategory: number,
  hashTraits: number
): TransactionInstruction {
  return createSingle(
    {
      supply: new BN(supply),
      shortMetadata,
      saleConfig,
      identifier: new BN(identifier),
      category,
      superCategory,
      eventCategory,
      hashTraits: new BN(hashTraits),
    },
    {
      storeAccount,
      itemAccount,
      creatorAuthority,
      itemReserveList,
      creator,
      payer,
      systemProgram: PublicKey.default,
    },
    PROGRAM_ID
  );
}
