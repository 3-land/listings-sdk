import { SendTransactionError } from "@solana/web3.js";
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

async function main() {
  //   const options: StoreInitOptions = {
  //     walletPath: "", //route to keypair.json generated from the solana cli
  //   };

  const optionsWithBase58: StoreInitOptions = {
    privateKey: "", //your private key
    isMainnet: false,
  };

  const storeSetup: CreateStoreParams = {
    storeName: "Super cool store",
    storeFee: 5,
  };

  const collectionOpts: CreateCollectionOptions = {
    collectionName: "Super awesome Collection",
    collectionSymbol: "SAC",
    collectionDescription: "This is a collection for the cool guys",
  };

  const createItemOptions: CreateSingleOptions = {
    itemName: "vidiojuego2",
    sellerFee: 500,
    itemAmount: 55,
    itemSymbol: "VDJ",
    itemDescription: "testing description",
    traits: [
      { trait_type: "type", value: "cool" },
      { trait_type: "creator", value: "me" },
    ],
    price: 10000000, //100000000 == 0.1 sol
    // splHash: "HabTivxE5cnR1G9CmXf3kysdKSmzJncedPstiqiUZBMv",
    mainImageUrl:
      "https://arweave.net/FMkKYYsheEImBfejYaPPoJbI3CxJxunwvErD9VYzxOY?ext=jpeg",
  };

  try {
    //image url: https://arweave.net/FMkKYYsheEImBfejYaPPoJbI3CxJxunwvErD9VYzxOY?ext=jpeg
    //image aI:  https://oaidalleapiprodscus.blob.core.windows.net/private/org-gqKriRsgW5z3sjYXrQv0vXPk/user-dhUswyb2oCg8NHc1yhPldLys/img-vX5am1Oagbimd9uSWnrSlUPb.png?st=2024-12-29T02%3A12%3A51Z&se=2024-12-29T04%3A12%3A51Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-12-28T21%3A04%3A53Z&ske=2024-12-29T21%3A04%3A53Z&sks=b&skv=2024-08-04&sig=ltGieu7AXXJUhIF7hyTPXmnnFVKTu5BwmifIB3kLqAY%3D
    // Create store
    //const storeResult = await createStoreTest(optionsWithBase58, storeSetup);
    //console.log("Store created. Transaction ID:", storeResult.transactionId);
    const landStoreMainnet = "AmQNs2kgw4LvS9sm6yE9JJ4Hs3JpVu65eyx9pxMG2xA";
    const landStoreDevnet = "GyPCu89S63P9NcCQAtuSJesiefhhgpGWrNVJs4bF2cSK";
    // Create Collection
    // const collection = await createCollectionImp(
    //   optionsWithBase58,
    //   collectionOpts
    // );
    // console.log("collection mint: ", collection);
    // Create single edition
    // const storeAccount = "3MwBR619SgJ35ek7vDLxxE5QvBaNq1fmmEZSXKW2X3Lf"; //"P1c4bboejX24NbY3vMw8EncKVmvcGEryznWLs4PGp9j"; //current store created for testing
    const collectionAccountMain =
      "GKLBspqHCKJMFKSn46CNdSP3AUeKDvcyF5knXxsJmhLj";
    const collectionAccountDev = "Dj91sSU6EErETscXj4mv4tMV6GM8HgJKFvqDqmq3F7Fz";
    const singleEditionResult = await createSingleImp(
      optionsWithBase58,
      landStoreDevnet,
      // landStoreMainnet,
      // collectionAccountMain,
      collectionAccountDev,
      createItemOptions
    );
    console.log(
      "Single edition created. Transaction ID:",
      singleEditionResult.transactionId
    );
    // Buy single edition
    // const itemAccount = "8iUHPXuZWQdSGTV9X8hPdUgxSLfdXX7YjZYMck2TALBc"; //"7BhKXmc5obiwn5hhrUhErVBrAT7TErYcTpRYE8ggfjKV"; //current item created for testing
    // const buyResult = await buySingleTest(options, itemAccount);
    // console.log(
    //   "Single edition purchased. Transaction ID:",
    //   buyResult.transactionId
    // );
  } catch (error) {
    handleError(error);
  }
}

main();
