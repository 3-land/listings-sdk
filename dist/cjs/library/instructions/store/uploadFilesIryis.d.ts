import { Signer, TransactionInstruction } from "@solana/web3.js";
export interface FileData {
    arrayBuffer(): Promise<ArrayBuffer> | ArrayBuffer;
    type: string;
    size?: number;
    name?: string;
}
export declare function uploadFilesIrysInstruction(options: any, irysObj: any, uuid: string): Promise<{
    instruction: TransactionInstruction;
    signerIrys: Signer;
    metadataUrl: string | undefined;
}>;
//# sourceMappingURL=uploadFilesIryis.d.ts.map