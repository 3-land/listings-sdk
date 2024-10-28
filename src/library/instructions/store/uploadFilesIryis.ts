import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { init as Irys } from "../../Irys/irys";
import { checkFileType } from "../../../utility/utils";

export async function uploadFilesIrysInstruction(
  address: PublicKey,
  payer: PublicKey,
  options: any
): Promise<TransactionInstruction> {
  const irys = await Irys(payer.toBase58(), options);
  const signer = irys?.getWallet();

  let main_file: any = false;
  let cover_file: any = false;

  if (options.metadata.files.file) {
    main_file = await irys?.bundle(options.metadata.files.file, false);
  }
  if (options.metadata.files.cover) {
    cover_file = await irys?.bundle(options.metadata.files.cover, false);
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

  const metadata_file = new Blob([JSON.stringify(offchain_metadata)], {
    type: "application/json",
  });

  const bundled_metadata_file = await irys?.bundle(
    { ...metadata_file, name: "fileName" },
    true
  );
  const irys_url = bundled_metadata_file?.irys?.url;

  const irys_files = [bundled_metadata_file];

  if (main_file) irys_files.push(main_file);
  if (cover_file) irys_files.push(cover_file);

  const irys_ix = await irys?.getFundingInstructions({
    files: irys_files,
    payer: false,
  });
  if (!irys_ix) {
    throw new Error("Failed to get funding instructions");
  }

  return irys_ix as unknown as TransactionInstruction;
}
