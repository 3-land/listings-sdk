import {
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  Signer,
  SystemProgram,
} from "@solana/web3.js";
import { getConnection } from "../utility/Connection";
import { createStoreInstruction } from "./instructions/store/createStore";
import { createSingleEditionInstruction } from "./instructions/store/createSingleEdition";
import { buySingleEditionInstruction } from "./instructions/store/buySingleEdition";
import {
  StoreConfig,
  MetadataArgs,
  SaleConfig,
  ExtraParameter,
  MetadataArgsJSON,
} from "../types/types";
import {
  holderPDA,
  storePDA,
  itemAccountPDA,
  creatorAuthorityPDA,
  toPublicKey,
  holderAccountPDA,
  userActivityPDA,
  creatorRegistryPDA,
  getMetadataPDA,
  collectionAuthorityRecord,
  collectorArtistRegistryPDA,
  collectorGlobalRegistryPDA,
  buyPaymentPDA,
} from "../utility/PdaManager";
import { devnetHolder } from "../utility/Holders";
import BN from "bn.js";
import { uploadFilesIrysInstruction } from "./instructions/store/uploadFilesIryis";
import { PROGRAM_CNFT, PROGRAM_ID } from "../types/programId";

import { registerCreator } from "../types/instructions/registerCreator";
import { init as Irys } from "./Irys/irys";
import { createApproveCollectionAuthorityInstruction } from "@metaplex-foundation/mpl-token-metadata";
import { registerCollector } from "../types/instructions";

export class Store {
  private connection: Connection;

  constructor(endpoint: string) {
    this.connection = getConnection(endpoint);
  }

  async createStore(
    payer: Signer,
    name: string,
    storeConfig: StoreConfig,
    storeId: number,
    creator: PublicKey
  ): Promise<string> {
    const [holderAccount] = await holderPDA({
      creator: devnetHolder.creator,
      slot: devnetHolder.slot,
    });
    const [storeAccount] = await storePDA({
      storeId: storeId,
      creator: creator.toString(),
      holder: holderAccount.toString(),
    });

    const instruction = createStoreInstruction(
      holderAccount,
      storeAccount,
      payer.publicKey,
      name,
      storeConfig,
      storeId
    );

    const transaction = new Transaction().add(instruction);
    return sendAndConfirmTransaction(this.connection, transaction, [payer]);
  }

  async createSingleEdition(
    payer: Signer,
    storeAccount: PublicKey,
    supply: number,
    metadata: MetadataArgs,
    saleConfig: SaleConfig,
    identifier: number,
    category: number[],
    superCategory: number[],
    eventCategory: number,
    hashTraits: number,
    creator: PublicKey,
    collection: PublicKey,
    irysData: any
  ): Promise<string> {
    const irys = await Irys(payer.publicKey.toBase58(), {});
    const uuid = "random_uuid_per_upload_session";

    const [itemAccount] = await itemAccountPDA({
      creator: creator,
      store: storeAccount,
      identifier: new BN(identifier),
    });
    const [creatorAuthority] = await creatorAuthorityPDA({
      creator: payer.publicKey,
      store: storeAccount,
    });

    let instructions = [];
    let signers = [payer];

    const { instruction, signerIrys, metadataUrl } =
      await uploadFilesIrysInstruction(irysData.options, irys, uuid);

    instructions.push(instruction);
    signers.push(signerIrys);

    const collection_mint = toPublicKey(collection);

    const new_authority = creatorAuthority; //PROGRAM_ID;

    const [authRecord] = await collectionAuthorityRecord({
      mint: collection_mint,
      new_authority: new_authority,
    });

    let collection_permission = false;

    try {
      const res = await this.connection.getAccountInfo(authRecord);
      console.log("account info: ", res);
      if (res) collection_permission = true;
    } catch (e) {
      collection_permission = false;
    }

    console.log("authrecord: ", authRecord);
    if (!collection_permission) {
      const metadataPda = await getMetadataPDA(collection_mint);
      console.log("metadataPda: ", metadataPda);

      const accounts = {
        collectionAuthorityRecord: authRecord,
        newCollectionAuthority: new_authority,
        updateAuthority: payer.publicKey,
        payer: payer.publicKey,
        metadata: metadataPda,
        mint: collection_mint,
      };
      const approveInstruction =
        createApproveCollectionAuthorityInstruction(accounts);
      instructions.push(approveInstruction);
      console.log("approve ix: ", approveInstruction);
      // signers.push(new_authority)
    }

    const meta: MetadataArgs = {
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadataUrl ? metadataUrl : "",
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      primarySaleHappened: metadata.primarySaleHappened,
      isMutable: metadata.isMutable,
      editionNonce: metadata.editionNonce || null,
      tokenStandard: metadata.tokenStandard || null,
      collection: metadata.collection || null,
      uses: metadata.uses || null,
      tokenProgramVersion: metadata.tokenProgramVersion,
      creators: metadata.creators,
      toJSON: function (): MetadataArgsJSON {
        throw new Error("Function not implemented.");
      },
      toEncodable: function () {
        throw new Error("Function not implemented.");
      },
    };

    const instructionSing = createSingleEditionInstruction(
      storeAccount,
      itemAccount,
      creatorAuthority,
      PROGRAM_ID,
      payer.publicKey,
      payer.publicKey,
      supply,
      meta,
      saleConfig,
      identifier,
      category,
      superCategory,
      eventCategory,
      hashTraits
    );
    instructions.push(instructionSing);

    const [userActivity, userActivityBump] = await userActivityPDA({
      user: payer.publicKey,
      store: storeAccount,
    });

    const [creatorRegistry] = await creatorRegistryPDA({
      user: payer.publicKey,
      store: storeAccount,
      currency: toPublicKey(PROGRAM_CNFT),
    });

    const registerIX = registerCreator(
      {
        creatorRegistry: creatorRegistry,
        userActivity: userActivity,
        itemAccount: itemAccount,
        store: storeAccount,
        payer: payer.publicKey,
        systemProgram: SystemProgram.programId,
      },
      {
        currency: toPublicKey(PROGRAM_CNFT),
        userActivityBump: userActivityBump,
      }
    );

    instructions.push(registerIX);

    const transaction = new Transaction().add(...instructions);

    const sendedconfirmedTransaction = await sendAndConfirmTransaction(
      this.connection,
      transaction,
      signers
    );
    const { errors, succeeds }: any = await irys?.uploadFiles({
      uuid,
      signature: sendedconfirmedTransaction,
    });
    return sendedconfirmedTransaction;
  }

  async buySingleEdition(
    payer: Signer,
    packAccount: PublicKey,
    burnProgress: PublicKey,
    owner: PublicKey,
    distributionBumps: number[],
    storeAccount: PublicKey,
    creator: PublicKey,
    identifier: number,
    extraAccounts: any[]
  ): Promise<string> {
    /*
      1. BuyPay
      2. PrintSingle
      3. RegisterCollector
    */
    const [itemAccount] = await itemAccountPDA({
      creator: creator,
      store: storeAccount,
      identifier: new BN(identifier),
    });

    const [paymentAccount] = await buyPaymentPDA({
      owner: payer.publicKey,
      itemAccount,
    });

    // const [holderAccount] = await holderPDA({
    //   creator: devnetHolder.creator,
    //   slot: devnetHolder.slot,
    // });
    // const [holderAccount] = await holderAccountPDA({
    //   creator: payer.publicKey,
    //});
    const holderAccount = storeAccount;
    // const holderAccount = toPublicKey(
    //   "8JddrxSrSt9csoixQcuyvzGoj8srfjPgcrKKWEePrZbY"
    // );

    // const [creatorAuthority] = await creatorAuthorityPDA({
    //   creator: creator,
    //   store: storeAccount,
    // });
    let instructions = [];
    const instruction = await buySingleEditionInstruction(
      paymentAccount,
      itemAccount,
      packAccount,
      burnProgress,
      holderAccount,
      owner,
      payer.publicKey,
      distributionBumps,
      {},
      storeAccount,
      identifier,
      extraAccounts,
      creator
    );
    console.log("buypay and the other: ", instruction);
    instructions.push(...instruction);

    const [userActivity, userActivityBump] = await userActivityPDA({
      user: payer.publicKey,
      store: storeAccount,
    });

    const [collectorRegistry] = await collectorArtistRegistryPDA({
      user: payer.publicKey,
      artist: creator,
      store: storeAccount,
      currency: toPublicKey(PROGRAM_CNFT),
    });

    const [creatorRegistry, creatorBump] = await creatorRegistryPDA({
      user: creator,
      currency: toPublicKey(PROGRAM_CNFT),
      store: storeAccount,
    });

    const [collectorGlobalRegistry] = await collectorGlobalRegistryPDA({
      user: payer.publicKey,
      currency: toPublicKey(PROGRAM_CNFT),
      store: storeAccount,
    });

    const registerIX = registerCollector(
      {
        creatorBump: creatorBump,
        activityBump: userActivityBump,
      },
      {
        collectorArtistRegistry: collectorRegistry,
        collectorGlobalRegistry: collectorGlobalRegistry,
        userActivity: userActivity,
        creatorRegistry: creatorRegistry,
        store: storeAccount,
        payer: payer.publicKey,
        systemProgram: SystemProgram.programId,
      }
    );

    instructions.push(registerIX);

    const transaction = new Transaction().add(...instructions);
    return sendAndConfirmTransaction(this.connection, transaction, [payer]);
  }

  //   async uploadFilesIrys(
  //     address: PublicKey,
  //     payer: PublicKey,
  //     signer: Signer,
  //     options: any
  //   ): Promise<{ tx: string; url: string | undefined }> {
  //     const uuid = "random_uuid_per_upload_session";

  //     const { instruction, signerIrys, metadataUrl, irys_files } =
  //       await uploadFilesIrysInstruction(address, payer, options);
  //     // console.log("********* instruction upload files: ", instruction);
  //     const transaction = new Transaction().add(instruction);
  //     // transaction.recentBlockhash = (
  //     //   await this.connection.getLatestBlockhash()
  //     // ).blockhash;
  //     // console.log("********* transaction upload files: ", transaction);
  //     transaction.recentBlockhash = (
  //       await this.connection.getLatestBlockhashAndContext()
  //     ).value.blockhash;
  //     const sendedconfirmedTransaction = await sendAndConfirmTransaction(
  //       this.connection,
  //       transaction,
  //       [signer, signerIrys]
  //     );
  //     await uploadFiles(
  //       { uuid, signature: sendedconfirmedTransaction, files: irys_files },
  //       payer
  //     );

  //     let res = {
  //       tx: sendedconfirmedTransaction,
  //       url: metadataUrl ? metadataUrl : undefined,
  //       // upload: async (signature: any) => {
  //       //   console.log("***** SIGNATURE!!");
  //       //   await uploadFiles({ uuid, signature, files: irys_files }, payer);
  //       // },
  //     };

  //     return res;
  //   }
}

export { StoreConfig, MetadataArgs, SaleConfig };
