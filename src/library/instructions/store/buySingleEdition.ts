import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PROGRAM_ID } from "../../../types/programId";
import { buyPay } from "../../../types/instructions";

export function buySingleEditionInstruction(
  paymentAccount: PublicKey,
  itemAccount: PublicKey,
  packAccount: PublicKey,
  burnProgress: PublicKey,
  holderAccount: PublicKey,
  owner: PublicKey,
  payer: PublicKey,
  distributionBumps: number[]
): TransactionInstruction {
  return buyPay(
    { distributionBumps },
    {
      paymentAccount,
      itemAccount,
      packAccount,
      burnProgress,
      holderAccount,
      owner,
      payer,
      systemProgram: PublicKey.default,
    },
    PROGRAM_ID
  );
}
