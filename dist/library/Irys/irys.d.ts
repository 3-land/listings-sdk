import { Keypair, PublicKey } from "@solana/web3.js";
interface IrysTransaction {
    upload(): Promise<any>;
}
interface IrysFile {
    type: string;
    name: string;
    nonce?: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    is_metadata?: boolean;
    status?: string;
    arweave?: string;
    data?: any;
    payload?: boolean;
    transaction?: string | IrysTransaction;
    irys?: {
        id: string;
        size: number;
        url: string;
        extension: string | null;
        nonce: string;
        transaction: IrysTransaction;
        irys_wallet: string;
        price: number;
        slippage_fee: number;
    };
}
export interface UploadOptions {
    uuid: string;
    signature: any;
}
interface RegisterOptions {
    files: IrysFile[];
    uuid: string;
}
interface FundingInstructionsOptions {
    files: any;
    payer: string | PublicKey | boolean;
}
export declare class IrysHelper {
    private irys;
    private wallet;
    private owner;
    private files_bridge;
    constructor();
    private ensureInitialized;
    verifyBalance(id: any): Promise<any>;
    getBalance(): Promise<import("bignumber.js").BigNumber>;
    bundle(file: IrysFile, is_metadata?: boolean): Promise<IrysFile>;
    getFileExtension(file: IrysFile): string | null;
    private parseTransaction;
    getFundingInstructions({ files, payer }: FundingInstructionsOptions): Promise<{
        instructions: import("@solana/web3.js").TransactionInstruction[];
        bytes: number;
        price: any;
    } | undefined>;
    generateWallet(): Promise<Keypair>;
    getWallet(): Promise<Keypair>;
    private arweaveToID;
    uploadFiles({ uuid, signature }: UploadOptions): Promise<{
        errors: string[];
        succeeds: string[];
    }>;
    clean(): Promise<void>;
    registerFiles({ files, uuid }: RegisterOptions): Promise<number>;
    sync(address: string): Promise<boolean>;
    init(address: string, options: {
        arweave_rpc?: string;
        rpc?: string;
        network?: string;
    }): Promise<boolean>;
}
export declare const init: (address: string, options: {
    arweave_rpc?: string;
    rpc?: string;
    network?: string;
}) => Promise<IrysHelper | null>;
export {};
//# sourceMappingURL=irys.d.ts.map