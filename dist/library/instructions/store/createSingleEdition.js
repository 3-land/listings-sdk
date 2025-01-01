import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "../../../types/programId";
import { createSingle } from "../../../types/instructions";
import BN from "bn.js";
export function createSingleEditionInstruction(storeAccount, itemAccount, creatorAuthority, itemReserveList, creator, payer, supply, shortMetadata, saleConfig, identifier, category, superCategory, eventCategory, hashTraits) {
    return createSingle({
        supply: new BN(supply),
        shortMetadata,
        saleConfig,
        identifier: new BN(identifier),
        category,
        superCategory,
        eventCategory,
        hashTraits: new BN(hashTraits),
    }, {
        storeAccount,
        itemAccount,
        creatorAuthority,
        itemReserveList,
        creator,
        payer,
        systemProgram: PublicKey.default,
    }, PROGRAM_ID);
}
