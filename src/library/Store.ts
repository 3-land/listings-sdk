import {
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  Signer,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
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
} from "../types/types";
import {
  holderPDA,
  storePDA,
  itemAccountPDA,
  itemReserveListPDA,
  creatorAuthorityPDA,
  toPublicKey,
  holderAccountPDA,
  collectionAuthorityRecord,
  getMetadataPDA,
  userActivityPDA,
  creatorRegistryPDA,
} from "../utility/PdaManager";
import { devnetHolder } from "../utility/Holders";
import BN from "bn.js";
import { uploadFilesIrysInstruction } from "./instructions/store/uploadFilesIryis";
import { PROGRAM_CNFT, PROGRAM_ID } from "../types/programId";

// import { createApproveCollectionAuthorityInstruction } from "../utility/PdaManager";
import { registerCreator } from "../types/instructions/registerCreator";
import { createApproveCollectionAuthorityInstruction } from "@metaplex-foundation/mpl-token-metadata";

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
    // itemAccount: PublicKey,
    // creatorAuthority: PublicKey,
    // itemReserveList: PublicKey,
    supply: number,
    metadata: MetadataArgs,
    saleConfig: SaleConfig,
    identifier: number,
    category: number[],
    superCategory: number[],
    eventCategory: number,
    hashTraits: number,
    creator: PublicKey,
    collection: PublicKey
  ): Promise<string> {
    const [itemAccount] = await itemAccountPDA({
      creator: creator,
      store: storeAccount,
      identifier: new BN(identifier),
    });
    const [creatorAuthority] = await creatorAuthorityPDA({
      creator: payer.publicKey,
      store: storeAccount,
    });

    console.log("Creator Authority:", creatorAuthority.toString());

    //remove
    // const [itemReserveList] = await itemReserveListPDA({ item: itemAccount });

    let instructions = [];
    let signers = [payer];

    // Log all accounts being used
    console.log("=== Account Debug Info ===");
    console.log("Payer:", payer.publicKey.toString());
    console.log("Store Account:", storeAccount.toString());
    console.log("Collection:", collection.toString());

    // const instruction = createSingleEditionInstruction(
    //   storeAccount,
    //   itemAccount,
    //   creatorAuthority,
    //   PROGRAM_ID,
    //   payer.publicKey,
    //   payer.publicKey,
    //   supply,
    //   metadata,
    //   saleConfig,
    //   identifier,
    //   category,
    //   superCategory,
    //   eventCategory,
    //   hashTraits
    // );
    // console.log("FIRST INSTRUCTION: ", instruction);
    // instructions.push(instruction);

    //Transaction for 3land permission on the collectible

    const collection_mint = toPublicKey(collection);

    const store = storeAccount;
    // const [creatorAuthority] = await anchor.creatorAuthorityPDA({
    //   creator: wallet,
    //   store,
    // });

    const new_authority = PROGRAM_ID;

    const [authRecord] = await collectionAuthorityRecord({
      mint: collection_mint,
      new_authority: new_authority,
    });
    console.log("Auth Record:", authRecord.toString());
    // const collection_permission = await this.connection.getAccountInfo(
    //   authRecord
    // );
    // console.log("collection permission:", !collection_permission);
    // console.log("\n=== First Instruction Accounts ===");
    // console.log(
    //   instruction.keys.map((k) => ({
    //     pubkey: k.pubkey.toString(),
    //     isSigner: k.isSigner,
    //     isWritable: k.isWritable,
    //   }))
    // );
    // if (!collection_permission) {
    const metadataPda = await getMetadataPDA(collection_mint);

    const metadataAccount = await this.connection.getAccountInfo(metadataPda);
    // The update authority is at bytes 1-32
    const updateAuthority = new PublicKey(
      metadataAccount?.data.slice(1, 33) || ""
    );
    // The mint is at bytes 33-64
    const mint = new PublicKey(metadataAccount?.data.slice(33, 65) || "");

    console.log("Update Authority:", updateAuthority.toString());
    console.log("Mint:", mint.toString());

    // Also log these addresses
    console.log("Payer address:", payer.publicKey.toString());
    console.log("Collection address:", collection.toString());

    console.log("metadataPDA : ", metadata);
    const accounts = {
      collectionAuthorityRecord: authRecord,
      newCollectionAuthority: new_authority,
      updateAuthority: payer.publicKey,
      payer: payer.publicKey,
      metadata: metadataPda,
      mint: collection_mint,
      // SystemProgram: SystemProgram.programId,
      // rent: SYSVAR_RENT_PUBKEY,
    };
    const approveInstruction =
      createApproveCollectionAuthorityInstruction(accounts);
    console.log("\n=== Approve Instruction Accounts ===");
    console.log(
      approveInstruction.keys.map((k) => ({
        pubkey: k.pubkey.toString(),
        isSigner: k.isSigner,
        isWritable: k.isWritable,
      }))
    );
    instructions.push(approveInstruction);
    // signers.push(new_authority)
    console.log("FIRST INSTRUCTION: ", instructions[1]);

    const instruction = createSingleEditionInstruction(
      storeAccount,
      itemAccount,
      creatorAuthority,
      PROGRAM_ID,
      payer.publicKey,
      payer.publicKey,
      supply,
      metadata,
      saleConfig,
      identifier,
      category,
      superCategory,
      eventCategory,
      hashTraits
    );
    console.log("SECOND INSTRUCTION: ", instruction);
    instructions.push(instruction);
    // }

    //Register creator to track metrics

    // First, let's verify all the PDA derivations
    const [userActivity, userActivityBump] = await userActivityPDA({
      user: payer.publicKey,
      store: storeAccount,
    });

    const [creatorRegistry] = await creatorRegistryPDA({
      user: payer.publicKey,
      store: storeAccount,
      currency: toPublicKey(PROGRAM_CNFT),
    });

    console.log("Debug PDAs:");
    console.log("User Activity:", userActivity.toString());
    console.log("User Activity Bump:", userActivityBump);
    console.log("Creator Registry:", creatorRegistry.toString());
    console.log("Item Account:", itemAccount.toString());
    console.log("Store Account:", storeAccount.toString());
    console.log("Program CNFT:", PROGRAM_CNFT.toString());

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
    console.log("THIRD INSTRUCTION: ", registerIX);

    //Build transaction
    const transaction = new Transaction().add(...instructions);
    console.log("RIGHT BEFORE SENDING AND CONFIRMING TRANSACTION", transaction);

    console.log("\n=== Required Signers ===");
    transaction.instructions.forEach((ix, i) => {
      console.log(
        `Instruction ${i} required signers:`,
        ix.keys.filter((k) => k.isSigner).map((k) => k.pubkey.toString())
      );
    });
    return sendAndConfirmTransaction(this.connection, transaction, signers);
  }

  async buySingleEdition(
    payer: Signer,
    paymentAccount: PublicKey,
    // itemAccount: PublicKey,
    packAccount: PublicKey,
    burnProgress: PublicKey,
    // holderAccount: PublicKey,
    owner: PublicKey,
    distributionBumps: number[],
    storeAccount: PublicKey,
    creator: PublicKey,
    identifier: number
  ): Promise<string> {
    const [itemAccount] = await itemAccountPDA({
      creator: creator,
      store: storeAccount,
      identifier: new BN(identifier),
    });

    const [holderAccount] = await holderAccountPDA({
      creator: "Cw6oE4MGTtWfof5rUXqfroN6ef9zZbeRtQNeUpJ4hPpt",
      // slot: devnetHolder.slot,
    });
    // const holderAccount = toPublicKey(
    //   "8JddrxSrSt9csoixQcuyvzGoj8srfjPgcrKKWEePrZbY"
    // );

    const [creatorAuthority] = await creatorAuthorityPDA({
      creator: creator,
      store: storeAccount,
    });

    const instruction = await buySingleEditionInstruction(
      paymentAccount,
      itemAccount,
      packAccount,
      burnProgress,
      holderAccount,
      owner,
      payer.publicKey,
      distributionBumps,
      {
        proof: null,
        storeBump: 123,
        creatorAuthBump: 123,
        itemBump: 123,
        treeBump: 123,
        extra: new ExtraParameter.None(),
      },
      {
        owner: owner,
        itemAccount: itemAccount,
        treeAuthority: storeAccount,
        storeAccount: storeAccount,
        creatorAuthority: creatorAuthority,
        // paymentAccount: new PublicKey("asdfadsf"),
        merkleTree: storeAccount,
        merkleManager: storeAccount,
        collectionAuthorityRecordPda: storeAccount,
        editionAccount: storeAccount,
        collectionMetadata: storeAccount,
        collectionMint: storeAccount,
        bubblegumSigner: storeAccount,
        // buytrackAccount: new PublicKey("asdfadsf"),
        // revealForMe: new PublicKey("asdfadsf"),
        payer: payer.publicKey,
        logWrapper: storeAccount,
        bubblegumProgram: storeAccount,
        compressionProgram: storeAccount,
        tokenMetadataProgram: storeAccount,
        systemProgram: storeAccount,
      },
      {},
      storeAccount
    );

    const transaction = new Transaction().add(instruction[0], instruction[1]);
    return sendAndConfirmTransaction(this.connection, transaction, [payer]);
  }

  async uploadFilesIrys(
    address: PublicKey,
    payer: PublicKey,
    signer: Signer,
    options: any
  ): Promise<string> {
    const instruction = await uploadFilesIrysInstruction(
      address,
      payer,
      options
    );
    const transaction = new Transaction().add(instruction);
    return sendAndConfirmTransaction(this.connection, transaction, [signer]);
  }
}

export { StoreConfig, MetadataArgs, SaleConfig };
