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
      "2xxw1VP8FBAPFjGRn4SVLzmYNq45TZ9ewnMoFfxdTU6CXYZL8UDrAGJPyNjUx4BL3Q3JMkA5u2z37N6gCn4QCz9C",
    isMainnet,
    //customRPC: "",
  };
}

async function testCreateStore() {
  const options = getBaseConfig();
  const storeSetup: CreateStoreParams = {
    storeName: "ultra new cool store",
    storeFee: 5,
  };

  try {
    const storeResult = await createStoreImp(options, storeSetup);
    console.log("Store created successfully:", {
      transactionId: storeResult.transactionId,
    });
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
    collectionName: "t3stCollection",
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

async function testCreateSingleEdition(withPool: boolean = false) {
  const options = getBaseConfig();
  const createItemOptions: CreateSingleOptions = {
    itemName: "elitem",
    sellerFee: 500, //5%
    itemAmount: 100,
    itemSymbol: "lp",
    itemDescription: "a test on dev",
    traits: [{ trait_type: "type", value: "pool" }],
    price: 1000000, //100000000 == 0.1 sol,
    // splHash: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    // poolName: "lepool",
    mainImageUrl: "https://pbs.twimg.com/media/GTDGt3wbAAAmYQ5?format=jpg",
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

    console.log("Single edition created successfully:", {
      transactionId: singleEditionResult.transactionId,
    });
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
    //await testCreateCollection();
    // await testCreateSingleEdition();
    // await testCreateSingleEdition(true); // with pool
    await testBuySingleEdition("5gV7MDNzHGqgGzxRWSETzdpf2aApWfUQCGrtDPjtc87z");
  } catch (error) {
    console.error("Test execution failed:");
    handleError(error);
  }
}

main();
