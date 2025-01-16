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
    COLLECTION: "GKLBspqHCKJMFKSn46CNdSP3AUeKDvcyF5knXxsJmhLj",
  },
};

function getBaseConfig(isMainnet: boolean = false): StoreInitOptions {
  return {
    privateKey: "",
    isMainnet,
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
  const options = getBaseConfig();
  const collectionOpts: CreateCollectionOptions = {
    collectionName: "サイバーパンク",
    collectionSymbol: "日本",
    collectionDescription: "未来は近い",
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
    itemName: "鬼滅の刃 - 3rd pool",
    sellerFee: 500, //5%
    itemAmount: 100,
    itemSymbol: "技術",
    itemDescription: "テクノロジーは素晴らしい",
    traits: [{ trait_type: "タイプ", value: "高度な" }],
    price: 1000000, //100000000 == 0.1 sol,
    splHash: "BaJicugPa1n8FJ3o5bYMwqGVLVTkAgTxChVijUaMS9u1", //"BaJicugPa1n8FJ3o5bYMwqGVLVTkAgTxChVijUaMS9u1",
    poolName: "slayer",
    mainImageUrl:
      "https://i.pinimg.com/736x/f5/ad/58/f5ad58bde10cda4637ad1ada6a77c562.jpg", //"https://pbs.twimg.com/media/GTDGt3wbAAAmYQ5?format=jpg",
  };

  try {
    const singleEditionResult = await createSingleImp(
      options,
      CONFIG.DEVNET.STORE,
      CONFIG.DEVNET.COLLECTION,
      createItemOptions,
      false, // isAI
      withPool // whether to create with pool
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
    await testCreateSingleEdition(true); // with pool
    // await testBuySingleEdition("item-account");
  } catch (error) {
    console.error("Test execution failed:");
    handleError(error);
  }
}

main();
