import { BN } from "bn.js";
import { StoreConfig, MetadataArgs, SaleConfig, Store } from "../Store";
import { Keypair, PublicKey, SendTransactionError } from "@solana/web3.js";
import {
  Creator,
  CurrencyType,
  FeeType,
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
import { PROGRAM_CNFT, SOLANA_ENDPOINT } from "../../types/programId";
import path from "path";

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

    const metadata: MetadataArgs = {
      name: "Mi NFTi",
      symbol: "IC",
      uri: "",
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

    const imageBuffer = fs2.readFileSync(
      path.join(process.cwd(), "assets", "3land_rebrand.gif")
    ).buffer;
    const coverBuffer = fs2.readFileSync(
      path.join(process.cwd(), "assets", "3land_rebrand.gif")
    ).buffer;

    const options = {
      symbol: metadata.symbol,
      metadata: {
        name: metadata.name,
        description: "Some new description for my nft 55",
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
      traits: [{ color: "green" }, { size: "big" }],
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
      876333354652487, //Math.floor(Math.random() * 100) //234234
      [1, 0, 0],
      [1, 0],
      0,
      12345,
      payer.publicKey,
      new PublicKey("2rQq34FJG1613i7H8cDfxuGCtEjJmFAUNbAPJqK699oD"), //hardcoded collection
      {
        address: payer.publicKey,
        payer: payer.publicKey,
        signer: walletKeypair,
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

async function buySingleTest(
  options: StoreInitOptions,
  storeAccount: string,
  item: string,
  itemCreator: string
) {
  const { sdk, walletKeypair, payer } = initializeSDKAndWallet(options);

  try {
    // const owner = Keypair.generate();
    const owner = payer;

    const buySingleEditionTxId = await sdk.buySingleEdition(
      walletKeypair,
      PROGRAM_CNFT,
      PROGRAM_CNFT,
      owner.publicKey,
      [0, 0, 0, 0, 0, 0],
      new PublicKey(storeAccount),
      new PublicKey(itemCreator),
      6688, //234234,
      [
        {
          pubkey: new PublicKey("GyPCu89S63P9NcCQAtuSJesiefhhgpGWrNVJs4bF2cSK"), //global store
          isSigner: false,
          isWritable: true,
        },
      ]
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
    walletPath: "/home/biccsdev/3land/packs_sdk/wallet/my-keypair.json", //route to keypair.json generated from the solana cli
  };

  try {
    // Create store
    // const storeResult = await createStoreTest(options);
    // console.log("Store created. Transaction ID:", storeResult.transactionId);
    // Create single edition
    const storeAccount = "7eK22v8AjrWZYnfia9uTfVXP3WktPZQMbfMJhshuoTFL"; //current store created for testing
    const singleEditionResult = await createSingleTest(options, storeAccount);
    console.log(
      "Single edition created. Transaction ID:",
      singleEditionResult.transactionId
    );
    // Buy single edition
    // const itemCreator = "kon4KawBAv91adTeyvJZqMpprkq1WRm2YyKHpBngwj6";
    // const itemAccount = "2YH2f4UrqHja1KecBCHMMGixq1etzwtWknTY2vfLHaQD"; //current item created for testing
    // const buyResult = await buySingleTest(
    //   options,
    //   storeAccount,
    //   itemAccount,
    //   itemCreator
    // );
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
