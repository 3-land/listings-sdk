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
import { mapTraits } from "../../utility/utils";

function initializeSDKAndWallet(options: StoreInitOptions) {
  let sdk;
  if (options.isMainnet) {
    sdk = new Store({ network: NetworkType.MAINNET });
  } else if (options.customRPC) {
    sdk = new Store({ customEndpoint: options.customRPC });
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
  collectionOpts: CreateCollectionOptions,
  priorityFeeParam?: number
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
      },
      priorityFeeParam
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
  createOptions: CreateSingleOptions,
  isAI: boolean,
  withPool: boolean = false,
  priorityFeeParam?: number
) {
  // Initialize SDK and wallet
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    // Create metadata with conditional creator share
    const creator = new Creator({
      address: payer.publicKey,
      verified: false,
      share: withPool ? 0 : 100, // 0% for pool creation, 100% for regular
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

    // Handle metadata files configuration
    let options: any;
    if (createOptions.mainImageUrl) {
      // URL-based metadata configuration
      const baseMetadataFiles = {
        file: {
          url: createOptions.mainImageUrl,
        },
        ...(createOptions.coverImageUrl && {
          cover: {
            url: createOptions.coverImageUrl,
          },
        }),
      };

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
      // File-based metadata configuration
      const imageBuffer = await fs2.promises.readFile(
        path.join(process.cwd(), "assets", "og.png")
      );
      if (!imageBuffer?.byteLength) {
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

    // Configure pricing
    const priceConfig: Price[] =
      createOptions?.price! <= 0
        ? []
        : [
            {
              amount: new BN(createOptions.price!),
              priceType: createOptions.splHash
                ? new CurrencyType.Spl({
                    id: new PublicKey(createOptions.splHash),
                  })
                : new CurrencyType.Native(),
              toJSON: function (): PriceJSON {
                throw new Error("Function not implemented.");
              },
              toEncodable: function () {
                throw new Error("Function not implemented.");
              },
            },
          ];

    // Create sale configuration
    const saleConfig: SaleConfig = {
      prices: priceConfig,
      priceType: new PriceRule.None(),
      rules: [],
      sendToVault: withPool ? 1 : 0, // 1 for pool creation, 0 for regular
      saleType: new SaleType.Normal(),
      toJSON: function (): SaleConfigJSON {
        throw new Error("Function not implemented.");
      },
      toEncodable: function () {
        throw new Error("Function not implemented.");
      },
    };

    // Process traits
    const t = mapTraits(
      options.traits.map((x: any) => ({
        trait_type: x.trait_type + "",
        value: x.value + "",
      })),
      ""
    );
    const hashTraits = new BN(t[0][0]);

    // Set category based on AI flag
    const category = isAI ? [1, 0, 55] : [1, 0, 0];

    if (withPool && !createOptions.splHash) {
      throw new Error("Pool creation requires a SPL token hash");
    } else if (
      createOptions.splHash === "So11111111111111111111111111111111111111112"
    ) {
      throw new Error(
        "Invalid SPL token hash, you can't use SOL as a SPL token"
      );
    }

    // Create single edition with or without pool
    const createSingleEditionTxId = withPool
      ? await sdk.createSingleEdition(
          walletKeypair,
          new PublicKey(storeAccount),
          createOptions.itemAmount,
          metadata,
          saleConfig,
          category,
          [1, 0],
          0,
          hashTraits,
          new PublicKey(collectionAccount),
          {
            options: options,
          },
          {
            currencyHash: new PublicKey(createOptions.splHash!),
            poolName: createOptions.poolName!,
          },
          priorityFeeParam
        )
      : await sdk.createSingleEdition(
          walletKeypair,
          new PublicKey(storeAccount),
          createOptions.itemAmount,
          metadata,
          saleConfig,
          category,
          [1, 0],
          0,
          hashTraits,
          new PublicKey(collectionAccount),
          {
            options: options,
          },
          undefined,
          priorityFeeParam
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
