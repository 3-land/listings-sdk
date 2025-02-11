import {
  createSingleImp,
  createStoreImp,
  buySingleImp,
  handleError,
  createCollectionImp,
} from "./library/implementation/storeImplementation";
import {
  CreateCollectionOptions,
  CreateSingleEditionParams,
  CreateSingleOptions,
  CreateStoreParams,
  StoreInitOptions,
} from "./types/implementation/implementationTypes";

import * as fs2 from "fs";
import path from "path";

const CONFIG = {
  DEVNET: {
    STORE: "GyPCu89S63P9NcCQAtuSJesiefhhgpGWrNVJs4bF2cSK",
    COLLECTION: "2TPnfy9DhNQp5sr3j6PFNtBDfXL5GTFFdjfm17nfkT9C",
  },
  MAINNET: {
    STORE: "AmQNs2kgw4LvS9sm6yE9JJ4Hs3JpVu65eyx9pxMG2xA",
    COLLECTION: "93T38vkVwE7zW3JMGcCfrym6quQJX4y6ndYyqHmJBzAW",
  },
};

function getBaseConfig(isMainnet: boolean = false): StoreInitOptions {
  return {
    privateKey:
      "",
    isMainnet,
    //customRPC: "",
  };
}

async function testCreateStore() {
  const options = getBaseConfig();
  const storeSetup: CreateStoreParams = {
    storeName: "super n3w cool store",
    storeFee: 5,
  };

  try {
    const storeResult = await createStoreImp(options, storeSetup);
    console.log("Store created successfully:", storeResult);
    return storeResult;
  } catch (error) {
    console.error("Failed to create store:");
    handleError(error);
    throw error;
  }
}

async function testCreateCollection() {
  const options = getBaseConfig();
  const collectionOpts: CreateCollectionOptions = {
    collectionName: "testCollect1on",
    collectionSymbol: "t3st",
    collectionDescription: "this is a collection test",
  };

  try {
    const collection = await createCollectionImp(options, collectionOpts);
    console.log("Collection created successfully:", collection);
    return collection;
  } catch (error) {
    console.error("Failed to create collection:");
    handleError(error);
    throw error;
  }
}

async function testCreateSingleEdition() {
  const options = getBaseConfig();

  const mainImageBuffer = await fs2.promises.readFile(
    path.join(process.cwd(), "assets", "donaltron.jpg")
  );
  const coverImageBuffer = await fs2.promises.readFile(
    path.join(process.cwd(), "assets", "niicl.gif")
  );

  const createItemOptions: CreateSingleOptions = {
    itemName: "elitem7",
    sellerFee: 500, //5%
    itemAmount: 100,
    itemSymbol: "lp",
    itemDescription: "a test on dev",
    traits: [{ trait_type: "type", value: "pool" }],
    price: 1000000, //100000000 == 0.1 sol,
    //splHash: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
    //poolName: "alberca",
    //mainImageUrl: "https://pbs.twimg.com/media/GTDGt3wbAAAmYQ5?format=jpg",
    mainImageFile: {
      buffer: mainImageBuffer,
      type: "image/jpeg",
      name: "astro.png",
    },
    coverImageFile: {
      buffer: coverImageBuffer,
      type: "image/gif",
      name: "niicl.gif",
    },
  };

  try {
    const params: CreateSingleEditionParams = {
      sdkConfig: options,
      storeAccount: CONFIG.DEVNET.STORE,
      collectionAccount: CONFIG.DEVNET.COLLECTION,
      createOptions: createItemOptions,
      isAI: false,
      //priorityFee: 100000,
    };

    const singleEditionResult = await createSingleImp(params);

    console.log("Single edition created successfully:", singleEditionResult);
    return singleEditionResult;
  } catch (error) {
    console.error("Failed to create single edition:");
    handleError(error);
    throw error;
  }
}

async function testBuySingleEdition(itemAccount: string) {
  const options = getBaseConfig();

  try {
    const buyResult = await buySingleImp(options, itemAccount);
    console.log("Single edition purchased successfully:", {
      transactionId: buyResult.transactionId,
    });
    return buyResult;
  } catch (error) {
    console.error("Failed to buy single edition:");
    handleError(error);
    throw error;
  }
}

async function main() {
  try {
    // await testCreateStore();
    // await testCreateCollection();
    //await testCreateSingleEdition();
    await testBuySingleEdition("5amcPgSnhEFfPWrvcDptoffR96gv2tLeSxKW9QNNhZTv");
  } catch (error) {
    console.error("Test execution failed:");
    handleError(error);
  }
}

main();
