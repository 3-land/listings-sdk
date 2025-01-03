import { BN } from "bn.js";
import { StoreConfig, SaleConfig, Store } from "../Store";
import { Keypair, PublicKey, SendTransactionError } from "@solana/web3.js";
import {
  Creator,
  CurrencyType,
  FeeType,
  Price,
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
import {
  CreateCollectionOptions,
  CreateSingleOptions,
  CreateStoreParams,
  StoreInitOptions,
} from "../../types/implementation/implementationTypes";
import { NetworkType } from "../../utility/config";

function initializeSDKAndWallet(options: StoreInitOptions) {
  let sdk;
  if (options.isMainnet) {
    sdk = new Store({ network: NetworkType.MAINNET });
  } else {
    sdk = new Store();
  }

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

async function createStoreImp(
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

async function createCollectionImp(
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

  let optionsCollection;
  if (collectionOpts.mainImageUrl) {
    // Use URLs if provided
    let files: any = {
      file: {
        url: collectionOpts.mainImageUrl,
      },
    };

    // Add cover URL if provided
    if (collectionOpts.coverImageUrl) {
      files.cover = {
        url: collectionOpts.coverImageUrl,
      };
    }

    optionsCollection = {
      symbol: metadata.symbol,
      metadata: {
        name: metadata.name,
        description: collectionOpts.collectionDescription,
        files: files,
      },
      creators: metadata.creators,
      traits: [],
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
    };
  } else {
    const imageBuffer = fs2.readFileSync(
      path.join(process.cwd(), "assets", "ds.jpeg")
    ).buffer;
    const coverBuffer = fs2.readFileSync(
      path.join(process.cwd(), "assets", "3land_rebrand.gif")
    ).buffer;

    optionsCollection = {
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
  }

  // const imageBuffer = fs2.readFileSync(
  //   path.join(process.cwd(), "assets", "ds.jpeg")
  // ).buffer;
  // const coverBuffer = fs2.readFileSync(
  //   path.join(process.cwd(), "assets", "3land_rebrand.gif")
  // ).buffer;

  // const optionsCollection = {
  //   symbol: metadata.symbol,
  //   metadata: {
  //     name: metadata.name,
  //     description: collectionOpts.collectionDescription,
  //     files: {
  //       file: {
  //         arrayBuffer() {
  //           return imageBuffer;
  //         },
  //         type: "image/gif",
  //       },
  //       cover: {
  //         arrayBuffer() {
  //           return coverBuffer;
  //         },
  //         type: "image/gif",
  //       },
  //     },
  //   },
  //   creators: metadata.creators,
  //   traits: [],
  //   sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
  // };

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
    return { success: false, error: error };
  }
}

async function createSingleImp(
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
    let options;
    if (createOptions.mainImageUrl) {
      // Define the type for metadata files
      interface MetadataFiles {
        file: {
          url: string;
        };
        cover?: {
          url: string;
        };
      }

      // Create base metadata files object
      let baseMetadataFiles: MetadataFiles = {
        file: {
          url: createOptions.mainImageUrl,
        },
      };

      // Add cover if present
      if (createOptions.coverImageUrl) {
        baseMetadataFiles.cover = {
          url: createOptions.coverImageUrl,
        };
      }

      options = {
        symbol: createOptions.itemSymbol,
        metadata: {
          name: metadata.name,
          description: createOptions.itemDescription,
          files: baseMetadataFiles,
        },
        creators: metadata.creators,
        traits: createOptions.traits,
        sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      };
    } else {
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
      options = {
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
    }

    let priceConfig: Price[];
    if (createOptions?.price! <= 0) {
      priceConfig = [];
      console.log("price is zero");
    } else {
      if (createOptions.splHash) {
        priceConfig = [
          {
            amount: new BN(createOptions.price!),
            priceType: new CurrencyType.Spl({
              id: new PublicKey(createOptions.splHash),
            }),
            toJSON: function (): PriceJSON {
              throw new Error("Function not implemented.");
            },
            toEncodable: function () {
              throw new Error("Function not implemented.");
            },
          },
        ];
        console.log("spl hash: ", createOptions.splHash);
      } else {
        priceConfig = [
          {
            amount: new BN(createOptions.price!),
            priceType: new CurrencyType.Native(),
            toJSON: function (): PriceJSON {
              throw new Error("Function not implemented.");
            },
            toEncodable: function () {
              throw new Error("Function not implemented.");
            },
          },
        ];
      }
    }

    console.log("priceConfig: ", priceConfig);
    const saleConfig: SaleConfig = {
      prices: priceConfig,
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
      createOptions.itemAmount,
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

async function buySingleImp(options: StoreInitOptions, item: string) {
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

export {
  createStoreImp,
  createCollectionImp,
  createSingleImp,
  buySingleImp,
  handleError,
};
