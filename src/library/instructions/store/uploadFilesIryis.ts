import {
  Keypair,
  PublicKey,
  Signer,
  TransactionInstruction,
} from "@solana/web3.js";
import { init as Irys, UploadOptions } from "../../Irys/irys";
import { checkFileType } from "../../../utility/utils";
import { Blob } from "node:buffer";

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

  if (options.metadata.files.file) {
    // console.log("main file b4:", options.metadata.files.file);
    main_file = await irys?.bundle(options.metadata.files.file, false);
    // console.log("main file after:", main_file);
  }
  if (options.metadata.files.cover) {
    // console.log("cover file b4:", options.metadata.files.cover);
    cover_file = await irys?.bundle(options.metadata.files.cover, false);
    // console.log("cover file after:", cover_file);
  }

  const offchain_metadata = {
    name: options.metadata.name,
    description: options.metadata.description,
    seller_fee_basis_points: options.sellerFeeBasisPoints,
    symbol: options.symbol,
    properties: {
      files: [
        { type: checkFileType(main_file), uri: main_file?.irys?.url },
        ...(cover_file
          ? [{ type: checkFileType(cover_file), uri: cover_file?.irys?.url }]
          : []),
      ],
      creators: options.creators,
    },
    image: (cover_file || main_file)?.irys?.url,
    attributes: options.traits,
    category: checkFileType(main_file),
  };

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

  //Register files in arweave
  const registeredFiles = await irys.registerFiles({ files: irys_files, uuid });

  if (!irys_ix) {
    throw new Error("Failed to get funding instructions");
  }
  if (signer) {
    return {
      instruction: irys_ix as unknown as TransactionInstruction,
      signerIrys: Keypair.fromSecretKey(signer.secretKey),
      metadataUrl: irys_url,
    };
  } else {
    throw new Error("no signer found in upload files irys instruction");
  }
}
