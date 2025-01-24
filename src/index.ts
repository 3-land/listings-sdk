import {
  createSingleImp,
  createStoreImp,
  buySingleImp,
  handleError,
  createCollectionImp,
} from "./library/implementation/storeImplementation";
import {
  CreateCollectionOptions,
  CreateSingleOptions,
  CreateStoreParams,
  StoreInitOptions,
} from "./types/implementation/implementationTypes";

const CONFIG = {
  DEVNET: {
    STORE: "GyPCu89S63P9NcCQAtuSJesiefhhgpGWrNVJs4bF2cSK",
    COLLECTION: "2Tu5dCJKHYt7K2XBYBRK7p7uUmusMJnijaMkag6PdB8z",
    TEST_COLLECTION: "2F5RPqTi74FkGNhguPE4oNropVsdWT45gKUvwHFKocG3",
  },
  MAINNET: {
    STORE: "AmQNs2kgw4LvS9sm6yE9JJ4Hs3JpVu65eyx9pxMG2xA",
    COLLECTION: "93T38vkVwE7zW3JMGcCfrym6quQJX4y6ndYyqHmJBzAW",
  },
};

function getBaseConfig(isMainnet: boolean = false): StoreInitOptions {
  return {
    privateKey: "",
    isMainnet,
    //customRPC: "",
  };
}

async function testCreateStore() {
  const options = getBaseConfig();
  const storeSetup: CreateStoreParams = {
    storeName: "Super new cool store",
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
  const options = getBaseConfig(true);
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
  const options = getBaseConfig(true);
  const createItemOptions: CreateSingleOptions = {
    itemName: "lepool",
    sellerFee: 500, //5%
    itemAmount: 100,
    itemSymbol: "lp",
    itemDescription: "a test pool on mainnet",
    traits: [{ trait_type: "type", value: "pool" }],
    price: 1000000, //100000000 == 0.1 sol,
    splHash: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", //"BaJicugPa1n8FJ3o5bYMwqGVLVTkAgTxChVijUaMS9u1",
    poolName: "lepool",
    mainImageUrl: "https://pbs.twimg.com/media/GTDGt3wbAAAmYQ5?format=jpg", //"https://pbs.twimg.com/media/GTDGt3wbAAAmYQ5?format=jpg",
  };

  //const priorityFeeParam = 100000;

  console.log("options init: ", options);

  try {
    const singleEditionResult = await createSingleImp(
      options,
      CONFIG.MAINNET.STORE,
      CONFIG.MAINNET.COLLECTION,
      createItemOptions,
      false, // isAI
      withPool // whether to create with pool
      //priorityFeeParam
    );

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
    // await testCreateCollection();
    // await testCreateSingleEdition();
    // await testCreateSingleEdition(true); // with pool
    // await testBuySingleEdition("item-account");
  } catch (error) {
    console.error("Test execution failed:");
    handleError(error);
  }
}

main();
