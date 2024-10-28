import { BN } from "bn.js";
import { StoreConfig, MetadataArgs, SaleConfig, Store } from "../Store";
import { Keypair, PublicKey, SendTransactionError } from "@solana/web3.js";
import {
  Creator,
  CurrencyType,
  EditionStoreType,
  FeeType,
  FeeTypeKind,
  MetadataArgsJSON,
  PriceJSON,
  PriceRule,
  SaleConfigJSON,
  SaleType,
  StoreConfigJSON,
  TokenProgramVersion,
} from "../../types/types";
import { Wallet } from "@project-serum/anchor";
import * as fs2 from "fs";
import fs from "fs/promises"; // Note: using fs/promises
import { PROGRAM_CNFT, SOLANA_ENDPOINT } from "../../types/programId";
// import fetch from "node-fetch";
import path from "path";
import { Blob } from "buffer";
import { arrayBuffer } from "stream/consumers";

interface StoreInitOptions {
  walletPath: string;
}

function initializeSDKAndWallet(options: StoreInitOptions) {
  const sdk = new Store(SOLANA_ENDPOINT);
  const secretKey = JSON.parse(fs2.readFileSync(options.walletPath, "utf-8"));
  const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
  const payer = new Wallet(walletKeypair);

  return { sdk, walletKeypair, payer };
}

async function createStoreTest(options: StoreInitOptions) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    const storeConfig: StoreConfig = {
      fee: new BN(1000),
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

    const storeId = Math.floor(Math.random() * 100);

    const createStoreTxId = await sdk.createStore(
      walletKeypair,
      "biccs Test Store 2",
      storeConfig,
      storeId,
      payer.publicKey
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

async function createSingleTest(
  options: StoreInitOptions,
  storeAccount: string
) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    const creator = new Creator({
      address: payer.publicKey,
      verified: false,
      share: 100,
    });

    // const imageBuffer = fs2.readFileSync(
    //   path.join(process.cwd(), "assets", "4.png")
    // ).buffer;
    // const coverBuffer = fs2.readFileSync(
    //   path.join(process.cwd(), "assets", "3land_rebrand.gif")
    // ).buffer;

    // const options = {
    //   metadata: {
    //     name: "My NFT",
    //     description: "Some description for my nft",
    //     files: {
    //       file: {
    //         arrayBuffer() {
    //           return imageBuffer;
    //         },
    //         type: "image/png",
    //       },
    //       cover: {
    //         arrayBuffer() {
    //           return coverBuffer;
    //         },
    //         type: "image/gif",
    //       },
    //     },
    //   },
    //   sellerFeeBasisPoints: 500,
    //   traits: [],
    // };
    // console.log("options: ", options);
    // const offChainMetadata = await sdk.uploadFilesIrys(
    //   payer.publicKey,
    //   payer.publicKey,
    //   walletKeypair,
    //   options
    // );

    // console.log("result from irys upload: ", offChainMetadata);

    const metadata: MetadataArgs = {
      name: "My NFT",
      symbol: "MYNFT",
      uri: "https://arweave.net/BT_tVDNA3xLDdmaPoxjawg6nhBT3OCjViMVS8fdDlFY",
      sellerFeeBasisPoints: 500,
      primarySaleHappened: false,
      isMutable: true,
      editionNonce: null,
      tokenStandard: null,
      collection: null,
      uses: null,
      tokenProgramVersion: new TokenProgramVersion.Original(),
      creators: [creator],
      toJSON: function (): MetadataArgsJSON {
        throw new Error("Function not implemented.");
      },
      toEncodable: function () {
        throw new Error("Function not implemented.");
      },
    };

    const saleConfig: SaleConfig = {
      prices: [
        {
          amount: new BN(1000000000),
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
      Math.floor(Math.random() * 100),
      [1, 2, 3],
      [1, 2],
      1,
      12345,
      payer.publicKey,
      new PublicKey("2rQq34FJG1613i7H8cDfxuGCtEjJmFAUNbAPJqK699oD")
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

async function buySingleTest(options: StoreInitOptions, storeAccount: string) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    const owner = Keypair.generate();

    const buySingleEditionTxId = await sdk.buySingleEdition(
      walletKeypair,
      payer.publicKey,
      PROGRAM_CNFT,
      PROGRAM_CNFT,
      owner.publicKey,
      [0, 0, 0, 0, 0, 0],
      new PublicKey(storeAccount),
      payer.publicKey,
      1
    );

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
    walletPath: "/home/biccsdev/3land/packs_sdk/wallet/my-keypair.json",
  };

  try {
    // Create store
    // const storeResult = await createStoreTest(options);
    // console.log("Store created. Transaction ID:", storeResult.transactionId);
    // Create single edition
    const storeAccount = "7eK22v8AjrWZYnfia9uTfVXP3WktPZQMbfMJhshuoTFL";
    const singleEditionResult = await createSingleTest(options, storeAccount);
    console.log(
      "Single edition created. Transaction ID:",
      singleEditionResult.transactionId
    );
    // Buy single edition
    // const itemAccount = "6sicpV1UBo3T2z7T5Z8PDBLswE1BQg8sRsgtP8sFmoju";
    // const buyResult = await buySingleTest(options, storeAccount);
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
