import { BN } from "bn.js";
import { StoreConfig, SaleConfig, Store } from "../Store";
import { Keypair, PublicKey, SendTransactionError } from "@solana/web3.js";
import {
  Creator,
  CurrencyType,
  FeeType,
  PriceJSON,
  PriceRule,
  SaleConfigJSON,
  SaleType,
  ShortMetadataArgs,
  ShortMetadataArgsJSON,
  StoreConfigJSON,
} from "../../types/types";
import { Wallet } from "@project-serum/anchor";
import * as fs2 from "fs";
import { PROGRAM_CNFT, SOLANA_ENDPOINT } from "../../types/programId";
import path from "path";
import { arrayBuffer } from "stream/consumers";

interface StoreInitOptions {
  walletPath: string;
}

function initializeSDKAndWallet(options: StoreInitOptions) {
  const sdk = new Store();
  const secretKey = JSON.parse(fs2.readFileSync(options.walletPath, "utf-8"));
  const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
  const payer = new Wallet(walletKeypair);

  return { sdk, walletKeypair, payer };
}

async function createStoreTest(options: StoreInitOptions) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    const storeConfig: StoreConfig = {
      fee: new BN(1000000),
      feePercentage: 5,
      feeType: new FeeType.AllMints(),
      trust: payer.publicKey,
      rules: [],
      toJSON: function (): StoreConfigJSON {
        throw new Error("Function not implemented.");
      },
      toEncodable: function () {
        throw new Error("Function not implemented.");
      },
    };

    const createStoreTxId = await sdk.createStore(
      walletKeypair,
      "ultimate store",
      storeConfig
    );

    return {
      transactionId: createStoreTxId,
      payerPublicKey: payer.publicKey.toString(),
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
}

async function createCollectionTest(options: StoreInitOptions) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  const collectionDetails = { __kind: "V1", size: 0 };
  const creator = new Creator({
    address: payer.publicKey,
    verified: false,
    share: 100,
  });

  const metadata = {
    symbol: "NiiC!", //max 10 chars
    name: "New Internet!", //max 32 chars
    uri: "",
    sellerFeeBasisPoints: new BN(5),
    creators: [creator],
    collection: null,
    uses: null,
  };

  const imageBuffer = fs2.readFileSync(
    path.join(process.cwd(), "assets", "niicl.gif")
  ).buffer;
  const coverBuffer = fs2.readFileSync(
    path.join(process.cwd(), "assets", "3land_rebrand.gif")
  ).buffer;

  const optionsCollection = {
    symbol: metadata.symbol,
    metadata: {
      name: metadata.name,
      description: "a cool collection",
      files: {
        file: {
          arrayBuffer() {
            return imageBuffer;
          },
          type: "image/gif",
        },
        cover: {
          arrayBuffer() {
            return coverBuffer;
          },
          type: "image/gif",
        },
      },
    },
    creators: metadata.creators,
    traits: [{ status: "CEO" }, { type: "club" }],
    sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
  };

  try {
    const collectionTx = await sdk.createCollection(
      walletKeypair,
      collectionDetails,
      metadata,
      {
        options: optionsCollection,
      }
    );
    console.log("create collection tx: ", collectionTx);
  } catch (error) {
    handleError(error);
  }
}

async function createSingleTest(
  options: StoreInitOptions,
  storeAccount: string,
  collectionAccount: string
) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    const creator = new Creator({
      address: payer.publicKey,
      verified: false,
      share: 100,
    });

    const metadata: ShortMetadataArgs = {
      name: "chainBattle",
      uri: "",
      uriType: 1,
      sellerFeeBasisPoints: 500,
      collection: new PublicKey(collectionAccount),
      creators: [creator],
      toJSON: function (): ShortMetadataArgsJSON {
        throw new Error("Function not implemented.");
      },
      toEncodable: function () {
        throw new Error("Function not implemented.");
      },
    };

    /*
      For MP4
      const videoBuffer = await fs2.promises.readFile(
        path.join(process.cwd(), "assets", "video.mp4")
      );

      For MP3
      const audioBuffer = await fs2.promises.readFile(
        path.join(process.cwd(), "assets", "audio.mp3")
      );

      For WebP
      const webpBuffer = await fs2.promises.readFile(
        path.join(process.cwd(), "assets", "image.webp")
      );

      For GLB
      const glbBuffer = await fs2.promises.readFile(
        path.join(process.cwd(), "assets", "model.glb")
);
    */

    // const imageBuffer = fs2.readFileSync(
    //   path.join(process.cwd(), "assets", "battle_sol.gif")
    // ).buffer;

    const imageBuffer = await fs2.promises.readFile(
      path.join(process.cwd(), "assets", "phone.glb")
    );

    if (!imageBuffer || imageBuffer.byteLength === 0) {
      throw new Error("Failed to read main image file");
    }
    // const coverBuffer = await fs2.promises.readFile(
    //   path.join(process.cwd(), "assets", "og.png")
    // );

    const coverBuffer = await fs2.promises.readFile(
      path.join(process.cwd(), "assets", "testvid.mp4")
    );

    if (!coverBuffer) {
      throw new Error("Failed to read cover file");
    }
    const options = {
      symbol: "chain",
      metadata: {
        name: metadata.name,
        description: "solana vs ethereum",
        files: {
          file: {
            arrayBuffer: () => imageBuffer,
            // type: "audio/mp3",
            name: "phone.glb",
            size: imageBuffer.length,
          },
          cover: {
            arrayBuffer: () => coverBuffer,
            type: "video/mp4",
            name: "testvid.mp4",
            size: coverBuffer.length,
          },
        },
      },
      creators: metadata.creators,
      traits: [{ region: "Kanto" }, { game: "emerald" }],
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
    };

    const saleConfig: SaleConfig = {
      prices: [
        {
          amount: new BN(1000000),
          priceType: new CurrencyType.Native(),
          toJSON: function (): PriceJSON {
            throw new Error("Function not implemented.");
          },
          toEncodable: function () {
            throw new Error("Function not implemented.");
          },
        },
      ],
      priceType: new PriceRule.None(),
      rules: [],
      sendToVault: 0,
      saleType: new SaleType.Normal(),
      toJSON: function (): SaleConfigJSON {
        throw new Error("Function not implemented.");
      },
      toEncodable: function () {
        throw new Error("Function not implemented.");
      },
    };

    const createSingleEditionTxId = await sdk.createSingleEdition(
      walletKeypair,
      new PublicKey(storeAccount),
      100,
      metadata,
      saleConfig,
      [1, 0, 0],
      [1, 0],
      0,
      12345,
      new PublicKey(collectionAccount),
      {
        options: options,
      }
    );

    return {
      transactionId: createSingleEditionTxId,
      payerPublicKey: payer.publicKey.toString(),
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
}

async function buySingleTest(options: StoreInitOptions, item: string) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    const owner = payer;

    const buySingleEditionTxId = await sdk.buySingleEdition(
      walletKeypair,
      [0, 0, 0, 0, 0, 0],
      new PublicKey(item)
    );
    console.log("** buy single tx: ", buySingleEditionTxId);
    return {
      transactionId: buySingleEditionTxId,
      ownerPublicKey: owner.publicKey.toString(),
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
}

function handleError(error: unknown) {
  if (error instanceof SendTransactionError) {
    console.error("Transaction failed. Error message:", error.message);
    console.error("Transaction logs:", error.logs);
  } else {
    console.error("An unexpected error occurred:", error);
  }
}

async function main() {
  const options: StoreInitOptions = {
    walletPath: "/home/biccsdev/3land/packs_sdk/wallet/my-keypair.json", //route to keypair.json generated from the solana cli
  };

  try {
    // Create store
    //const storeResult = await createStoreTest(options);
    //console.log("Store created. Transaction ID:", storeResult.transactionId);
    // Create Collection
    //const collection = await createCollectionTest(options);
    //console.log("collection mint: ", collection);
    // Create single edition
    const storeAccount = "3MwBR619SgJ35ek7vDLxxE5QvBaNq1fmmEZSXKW2X3Lf"; //"P1c4bboejX24NbY3vMw8EncKVmvcGEryznWLs4PGp9j"; //current store created for testing
    const collectionAccount = "4S1c3YMTstfvKKJkD6fJCTxjCdgQLWVd5xDdNZeHo58q"; //"2rQq34FJG1613i7H8cDfxuGCtEjJmFAUNbAPJqK699oD";
    const singleEditionResult = await createSingleTest(
      options,
      storeAccount,
      collectionAccount
    );
    console.log(
      "Single edition created. Transaction ID:",
      singleEditionResult.transactionId
    );
    // Buy single edition
    // const itemAccount = "8iUHPXuZWQdSGTV9X8hPdUgxSLfdXX7YjZYMck2TALBc"; //"7BhKXmc5obiwn5hhrUhErVBrAT7TErYcTpRYE8ggfjKV"; //current item created for testing
    // const buyResult = await buySingleTest(options, itemAccount);
    // console.log(
    //   "Single edition purchased. Transaction ID:",
    //   buyResult.transactionId
    // );
  } catch (error) {
    handleError(error);
  }
}

main();

export { createStoreTest, createSingleTest, buySingleTest, SOLANA_ENDPOINT };
