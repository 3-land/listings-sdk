"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storeImplementation_1 = require("./library/implementation/storeImplementation");
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
function getBaseConfig(isMainnet = false) {
    return {
        privateKey: "",
        isMainnet,
        //customRPC: "",
    };
}
async function testCreateStore() {
    const options = getBaseConfig();
    const storeSetup = {
        storeName: "Super new cool store",
        storeFee: 5,
    };
    try {
        const storeResult = await (0, storeImplementation_1.createStoreImp)(options, storeSetup);
        console.log("Store created successfully:", {
            transactionId: storeResult.transactionId,
        });
        return storeResult;
    }
    catch (error) {
        console.error("Failed to create store:");
        (0, storeImplementation_1.handleError)(error);
        throw error;
    }
}
async function testCreateCollection() {
    const options = getBaseConfig(true);
    const collectionOpts = {
        collectionName: "t3stCollection",
        collectionSymbol: "t3st",
        collectionDescription: "this is a collection test",
    };
    try {
        const collection = await (0, storeImplementation_1.createCollectionImp)(options, collectionOpts);
        console.log("Collection created successfully:", collection);
        return collection;
    }
    catch (error) {
        console.error("Failed to create collection:");
        (0, storeImplementation_1.handleError)(error);
        throw error;
    }
}
async function testCreateSingleEdition(withPool = false) {
    const options = getBaseConfig(true);
    const createItemOptions = {
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
        const singleEditionResult = await (0, storeImplementation_1.createSingleImp)(options, CONFIG.MAINNET.STORE, CONFIG.MAINNET.COLLECTION, createItemOptions, false, // isAI
        withPool // whether to create with pool
        //priorityFeeParam
        );
        console.log("Single edition created successfully:", {
            transactionId: singleEditionResult.transactionId,
        });
        return singleEditionResult;
    }
    catch (error) {
        console.error("Failed to create single edition:");
        (0, storeImplementation_1.handleError)(error);
        throw error;
    }
}
async function testBuySingleEdition(itemAccount) {
    const options = getBaseConfig();
    try {
        const buyResult = await (0, storeImplementation_1.buySingleImp)(options, itemAccount);
        console.log("Single edition purchased successfully:", {
            transactionId: buyResult.transactionId,
        });
        return buyResult;
    }
    catch (error) {
        console.error("Failed to buy single edition:");
        (0, storeImplementation_1.handleError)(error);
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
    }
    catch (error) {
        console.error("Test execution failed:");
        (0, storeImplementation_1.handleError)(error);
    }
}
main();
//# sourceMappingURL=index.js.map