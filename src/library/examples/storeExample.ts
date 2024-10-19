import { BN } from "bn.js";
import { StoreConfig, MetadataArgs, SaleConfig, Store } from "../Store";
// import { CnFaucetSDK, StoreConfig, MetadataArgs, SaleConfig } from "../src";
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
import * as fs from "fs";

// Replace with your actual endpoint
const SOLANA_ENDPOINT = "https://api.devnet.solana.com";

async function main() {
  // Initialize the SDK
  const sdk = new Store(SOLANA_ENDPOINT);

  // Create a new keypair for testing (replace with your actual keypair in production)
  const secretKey = JSON.parse(
    fs.readFileSync(
      "/home/biccsdev/3land/packs_sdk/wallet/my-keypair.json",
      "utf-8"
    )
  );
  const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
  const payer = new Wallet(walletKeypair);
  console.log("connected wallet: ", payer.publicKey.toString());
  //   const payer = Keypair.generate();

  // Example: Create a store
  const storeConfig: StoreConfig = {
    fee: new BN(1000),
    feePercentage: 5,
    feeType: new FeeType.AllMints(),
    trust: payer.publicKey,
    rules: [],
    toJSON: function (): StoreConfigJSON {
      throw new Error("Function not implemented.");
    },
    toEncodable: function (): {
      fee: import("bn.js");
      feePercentage: number;
      feeType:
        | { AllMints: {} }
        | { PricedMintsOnly: {} }
        | { SkipBurnMints: {} };
      trust: PublicKey;
      rules: (
        | { ListingPerWallet: { config: { amount: number } } }
        | {
            AllowedCurrency: {
              config:
                | { Native: {} }
                | { Spl: { id: PublicKey } }
                | { Collection: { id: PublicKey } }
                | { None: {} };
            };
          }
      )[];
    } {
      throw new Error("Function not implemented.");
    },
  };

  //   const storeAccount = Keypair.generate();
  //   const holderAccount = Keypair.generate();

  try {
    // const createStoreTxId = await sdk.createStore(
    //   walletKeypair,
    //   "biccs Test Store",
    //   storeConfig,
    //   Math.random() * 100,
    //   payer.publicKey
    // );
    // console.log("Store created. Transaction ID:", createStoreTxId);

    const creator = new Creator({
      address: payer.publicKey,
      verified: true,
      share: 100,
    });

    // Example: Create a single edition
    const metadata: MetadataArgs = {
      name: "My NFT",
      symbol: "MNFT",
      uri: "https://example.com/nft.json",
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
      toEncodable: function (): {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        primarySaleHappened: boolean;
        isMutable: boolean;
        editionNonce: number | null;
        tokenStandard:
          | { NonFungible: {} }
          | { FungibleAsset: {} }
          | { Fungible: {} }
          | { NonFungibleEdition: {} }
          | null;
        collection: { verified: boolean; key: PublicKey } | null;
        uses: {
          useMethod: { Burn: {} } | { Multiple: {} } | { Single: {} };
          remaining: import("bn.js");
          total: import("bn.js");
        } | null;
        tokenProgramVersion: { Original: {} } | { Token2022: {} };
        creators: { address: PublicKey; verified: boolean; share: number }[];
      } {
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
          toEncodable: function (): {
            amount: import("bn.js");
            priceType:
              | { Native: {} }
              | { Spl: { id: PublicKey } }
              | { Collection: { id: PublicKey } }
              | { None: {} };
          } {
            throw new Error("Function not implemented.");
          },
        },
      ],
      priceType: new PriceRule.None(),
      rules: [],
      editionStoreType: new EditionStoreType.None(),
      saleType: new SaleType.Normal(),
      toJSON: function (): SaleConfigJSON {
        throw new Error("Function not implemented.");
      },
      toEncodable: function (): {
        prices: {
          amount: import("bn.js");
          priceType:
            | { Native: {} }
            | { Spl: { id: PublicKey } }
            | { Collection: { id: PublicKey } }
            | { None: {} };
        }[];
        priceType: { None: {} } | { And: {} } | { Or: {} };
        rules: (
          | { CollectionGate: { id: PublicKey } }
          | { DateGate: { time: number; ends: number } }
          | {
              DatePriorityGate: { starts: number; ends: number; index: number };
            }
          | { ListGate: { id: PublicKey } }
          | {
              AuthorityGate: {
                types: ({ IPGate: {} } | { BiometricsGate: {} })[];
              };
            }
        )[];
        editionStoreType: { None: {} } | { Name: {} } | { Url: {} };
        saleType: { Normal: {} } | { NoMarketFee: {} };
      } {
        throw new Error("Function not implemented.");
      },
    };

    // const itemAccount = Keypair.generate();
    // const creatorAuthority = Keypair.generate();
    // const itemReserveList = Keypair.generate();

    const storeAccount = "B2VKuCgz5PqxrRjz7oha4aDy8SMpjgTzqvGMTSL38kkL";

    const createSingleEditionTxId = await sdk.createSingleEdition(
      walletKeypair,
      new PublicKey(storeAccount),
      //   itemAccount.publicKey,
      //   creatorAuthority.publicKey,
      //   itemReserveList.publicKey,
      100,
      metadata,
      saleConfig,
      1,
      [1, 2, 3],
      [1, 2],
      1,
      12345,
      payer.publicKey
    );
    console.log(
      "Single edition created. Transaction ID:",
      createSingleEditionTxId,
      payer.publicKey
    );

    // // Example: Buy a single edition
    // const paymentAccount = Keypair.generate();
    // const packAccount = Keypair.generate();
    // const burnProgress = Keypair.generate();
    // const owner = Keypair.generate();

    // const buySingleEditionTxId = await sdk.buySingleEdition(
    //   payer,
    //   paymentAccount.publicKey,
    //   itemAccount.publicKey,
    //   packAccount.publicKey,
    //   burnProgress.publicKey,
    //   holderAccount.publicKey,
    //   owner.publicKey,
    //   [1, 2, 3, 4, 5, 6]
    // );
    // console.log(
    //   "Single edition purchased. Transaction ID:",
    //   buySingleEditionTxId
    // );
  } catch (error) {
    if (error instanceof SendTransactionError) {
      console.error("Transaction failed. Error message:", error.message);
      console.error("Transaction logs:", error.logs);

      // If you specifically want to use getLogs()
      //   const logs = error.getLogs(connection);
      //   console.error("Detailed logs:", logs);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    // console.error("Error:", error);
  }
}

main();
