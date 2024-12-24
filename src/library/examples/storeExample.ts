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
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

interface StoreInitOptions {
  // Make walletPath optional
  walletPath?: string;
  // Add privateKey option - can be array of numbers, Uint8Array, or base58 string
  privateKey?: number[] | Uint8Array | string;
}
interface CreateStoreParams {
  storeName: string;
  storeFee: number;
}

function initializeSDKAndWallet(options: StoreInitOptions) {
  const sdk = new Store();
  let walletKeypair: Keypair;

  if (options.privateKey) {
    if (typeof options.privateKey === "string") {
      // Decode base58 string to Uint8Array
      try {
        const decoded = bs58.decode(options.privateKey);
        walletKeypair = Keypair.fromSecretKey(decoded);
      } catch (error) {
        throw new Error(`Invalid base58 private key: ${error}`);
      }
    } else if (Array.isArray(options.privateKey)) {
      // Handle array of numbers
      walletKeypair = Keypair.fromSecretKey(
        Uint8Array.from(options.privateKey)
      );
    } else {
      // Handle Uint8Array directly
      walletKeypair = Keypair.fromSecretKey(options.privateKey);
    }
  } else if (options.walletPath) {
    // Existing file-based initialization
    const secretKey = JSON.parse(fs2.readFileSync(options.walletPath, "utf-8"));
    walletKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
  } else {
    throw new Error("Either walletPath or privateKey must be provided");
  }

  const payer = new Wallet(walletKeypair);
  return { sdk, walletKeypair, payer };
}

async function createStoreTest(
  options: StoreInitOptions,
  storeSetup: CreateStoreParams
) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    const storeConfig: StoreConfig = {
      fee: new BN(1000000),
      feePercentage: storeSetup.storeFee,
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
      storeSetup.storeName,
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

interface CreateCollectionOptions {
  collectionSymbol: string;
  collectionName: string;
  collectionDescription: string;
}

async function createCollectionTest(
  options: StoreInitOptions,
  collectionOpts: CreateCollectionOptions
) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  const collectionDetails = { __kind: "V1", size: 0 };
  const creator = new Creator({
    address: payer.publicKey,
    verified: false,
    share: 100,
  });

  const metadata = {
    symbol: collectionOpts.collectionSymbol, //max 10 chars
    name: collectionOpts.collectionName, //max 32 chars
    uri: "",
    sellerFeeBasisPoints: new BN(5),
    creators: [creator],
    collection: null,
    uses: null,
  };

  const imageBuffer = fs2.readFileSync(
    path.join(process.cwd(), "assets", "ds.jpeg")
  ).buffer;
  const coverBuffer = fs2.readFileSync(
    path.join(process.cwd(), "assets", "3land_rebrand.gif")
  ).buffer;

  const optionsCollection = {
    symbol: metadata.symbol,
    metadata: {
      name: metadata.name,
      description: collectionOpts.collectionDescription,
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
    traits: [],
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
    return collectionTx;
  } catch (error) {
    handleError(error);
  }
}

interface CreateSingleOptions {
  itemName: string;
  sellerFee: number;
  itemSymbol: string;
  itemDescription: string;
  traits: any;
  price: number;
}

async function createSingleTest(
  options: StoreInitOptions,
  storeAccount: string,
  collectionAccount: string,
  createOptions: CreateSingleOptions
) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    const creator = new Creator({
      address: payer.publicKey,
      verified: false,
      share: 100,
    });

    const metadata: ShortMetadataArgs = {
      name: createOptions.itemName,
      uri: "",
      uriType: 1,
      sellerFeeBasisPoints: createOptions.sellerFee,
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

    const imageBuffer = await fs2.promises.readFile(
      path.join(process.cwd(), "assets", "og.png")
    );

    if (!imageBuffer || imageBuffer.byteLength === 0) {
      throw new Error("Failed to read main image file");
    }

    const coverBuffer = await fs2.promises.readFile(
      path.join(process.cwd(), "assets", "niicl.gif")
    );

    if (!coverBuffer) {
      throw new Error("Failed to read cover file");
    }
    const options = {
      symbol: createOptions.itemSymbol,
      metadata: {
        name: metadata.name,
        description: createOptions.itemDescription,
        files: {
          file: {
            arrayBuffer: () => imageBuffer,
            type: "image/png",
            name: "og.png",
            size: imageBuffer.length,
          },
          cover: {
            arrayBuffer: () => coverBuffer,
            type: "image/gif",
            name: "niicl.gif",
            size: coverBuffer.length,
          },
        },
      },
      creators: metadata.creators,
      traits: createOptions.traits,
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
    };

    const saleConfig: SaleConfig = {
      prices: [
        {
          amount: new BN(createOptions.price),
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
    walletPath: "", //route to keypair.json generated from the solana cli
  };

  const optionsWithBase58: StoreInitOptions = {
    privateKey:
      "2ixmpz6W9aAE7HDqCJYy1tsqQcAHhkuP54jTPGnTyqvYHJearwT16DzmkkaQLARB9TshZvoS3WE5dQg183wryVCC",
  };

  const storeSetup: CreateStoreParams = {
    storeName: "Super cool store",
    storeFee: 5,
  };

  const collectionOpts: CreateCollectionOptions = {
    collectionName: "Super awesome Collection",
    collectionSymbol: "SAC",
    collectionDescription: "This is a collection for the cool guys",
  };

  const createItemOptions: CreateSingleOptions = {
    itemName: "supercoolitem5",
    sellerFee: 500,
    itemSymbol: "SCI5",
    itemDescription: "This is the coolest thing ever frfr",
    traits: [
      { trait_type: "type", value: "cool" },
      { trait_type: "creator", value: "me" },
    ],
    price: 1000000, //1000000 == 0.001 sol
  };

  try {
    // Create store
    //const storeResult = await createStoreTest(optionsWithBase58, storeSetup);
    //console.log("Store created. Transaction ID:", storeResult.transactionId);
    const landStoreMainnet = "AmQNs2kgw4LvS9sm6yE9JJ4Hs3JpVu65eyx9pxMG2xA";
    const landStoreDevnet = "GyPCu89S63P9NcCQAtuSJesiefhhgpGWrNVJs4bF2cSK";
    // Create Collection
    // const collection = await createCollectionTest(
    //   optionsWithBase58,
    //   collectionOpts
    // );
    // console.log("collection mint: ", collection);
    // Create single edition
    // const storeAccount = "3MwBR619SgJ35ek7vDLxxE5QvBaNq1fmmEZSXKW2X3Lf"; //"P1c4bboejX24NbY3vMw8EncKVmvcGEryznWLs4PGp9j"; //current store created for testing
    const collectionAccount = "Fpm8XgXEuNxxjmqUQuqEFkGusiSsKM6astUGPs5U9x6v"; //"2rQq34FJG1613i7H8cDfxuGCtEjJmFAUNbAPJqK699oD";
    const singleEditionResult = await createSingleTest(
      optionsWithBase58,
      landStoreDevnet,
      collectionAccount,
      createItemOptions
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
