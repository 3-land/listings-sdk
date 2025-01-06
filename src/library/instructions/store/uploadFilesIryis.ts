import { Keypair, Signer, TransactionInstruction } from "@solana/web3.js";
import {
  checkCategory,
  checkFileType,
  getFileCategory,
  getFileType,
  getUrlFileType,
  isAnimatable,
  normalizeFileData,
  validateFileType,
} from "../../../utility/utils";
import { Blob } from "node:buffer";

export interface FileData {
  arrayBuffer(): Promise<ArrayBuffer> | ArrayBuffer;
  type: string;
  size?: number;
  name?: string;
}

export async function uploadFilesIrysInstruction(
  options: any,
  irysObj: any,
  uuid: string
): Promise<{
  instruction: TransactionInstruction;
  signerIrys: Signer;
  metadataUrl: string | undefined;
}> {
  const irys = irysObj;
  const signer = await irys?.getWallet();
  let main_file: any = false;
  let cover_file: any = false;
  try {
    console.log("FILEE: ", options.metadata.files.file.url);
    if (options.metadata.files.file && !options.metadata.files.file.url) {
      const normalizedMainFile = await normalizeFileData(
        options.metadata.files.file
      );
      validateFileType(normalizedMainFile.type);
      main_file = await irys?.bundle(normalizedMainFile, false);
    }

    if (options.metadata.files.cover && !options.metadata.files.cover.url) {
      const normalizedCoverFile = await normalizeFileData(
        options.metadata.files.cover
      );
      validateFileType(normalizedCoverFile.type);
      cover_file = await irys?.bundle(normalizedCoverFile, false);
    }

    const offchain_metadata = {
      name: options.metadata.name,
      description: options.metadata.description,
      seller_fee_basis_points: options.sellerFeeBasisPoints,
      symbol: options.symbol,
      properties: {
        files: [
          main_file && {
            type: getFileType(main_file),
            uri: main_file?.irys?.url,
          },
          options.metadata.files.file.url && {
            type: await getUrlFileType(options.metadata.files.file.url),
            uri: options.metadata.files.file.url,
          },
          cover_file && {
            type: getFileType(cover_file),
            uri: cover_file?.irys?.url,
          },
          options?.metadata?.files?.cover?.url && {
            type: await getUrlFileType(options.metadata.files.cover.url),
            uri: options.metadata.files.cover.url,
          },
        ].filter(Boolean),
        creators: options.creators,
      },
      image:
        (main_file || cover_file)?.irys?.url || options.metadata.files.file.url,
      attributes: options.traits,
      category: main_file ? getFileCategory(main_file) : "image",
      animation_url: isAnimatable(main_file?.type)
        ? main_file?.irys?.url
        : undefined,
    };

    console.log("offchain_metadata: ", offchain_metadata);

    const metadata_blob = new Blob([JSON.stringify(offchain_metadata)], {
      type: "application/json",
    });

    const metadata_file = {
      data: metadata_blob,
      name: "metadata.json",
      type: "application/json",
      size: metadata_blob.size,
      arrayBuffer: () => metadata_blob.arrayBuffer(),
    };

    const bundled_metadata_file = await irys?.bundle(metadata_file, true);
    const irys_url = bundled_metadata_file?.irys?.url;

    console.log("arweave url: ", irys_url);

    const irys_files = [bundled_metadata_file];
    if (main_file) irys_files.push(main_file);
    if (cover_file) irys_files.push(cover_file);

    const irys_ix = await irys?.getFundingInstructions({
      files: irys_files,
      payer: false,
    });

    const registeredFiles = await irys.registerFiles({
      files: irys_files,
      uuid,
    });

    if (!irys_ix) {
      throw new Error("Failed to get funding instructions");
    }

    if (!signer) {
      throw new Error("No signer found in upload files irys instruction");
    }

    return {
      instruction: irys_ix as unknown as TransactionInstruction,
      signerIrys: Keypair.fromSecretKey(signer.secretKey),
      metadataUrl: irys_url,
    };
  } catch (error) {
    console.error("Error in uploadFilesIrysInstruction:", error);
    throw new Error(`Failed to process files: ${error}`);
  }
}
