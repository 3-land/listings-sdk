import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
export declare let lutAccount: any;
export declare let merkleTree: any;
export declare let merkleOptions: {
    merkleTree: any;
    lutAccount: any;
    mainnet: {
        merkleTree: string;
        lutAccount: string;
    };
    devnet: {
        merkleTree: string;
        lutAccount: string;
    };
};
export declare function buySingleEditionInstruction(paymentAccount: PublicKey, itemAccount: PublicKey, packAccount: PublicKey, burnDeposit: PublicKey, poolVault: PublicKey, holderAccount: PublicKey, owner: PublicKey, payer: PublicKey, distributionBumps: number[], data: any, storeAccount: PublicKey, globalStoreAccount: PublicKey, identifier: number, extraAccounts: any[], creator: PublicKey, collectionAddress: PublicKey, connectionInstance: Connection): Promise<TransactionInstruction[]>;
//# sourceMappingURL=buySingleEdition.d.ts.map