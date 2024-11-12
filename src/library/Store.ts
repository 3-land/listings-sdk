import {
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  Signer,
  SystemProgram,
  sendAndConfirmRawTransaction,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
  AddressLookupTableProgram,
  AddressLookupTableAccount,
  clusterApiUrl as clusterApiUrl2,
  Keypair,
} from "@solana/web3.js";
import {
  createUpdateMetadataAccountInstruction,
  createUpdateMetadataAccountV2Instruction,
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  //DataV2,
  createMintNewEditionFromMasterEditionViaTokenInstruction,
  PROGRAM_ID as metaPROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";

import {
  MintLayout,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createInitializeMintInstruction,
  createBurnInstruction,
  getAccount,
} from "@solana/spl-token";
import { getConnection } from "../utility/Connection";
import { createStoreInstruction } from "./instructions/store/createStore";
import { createSingleEditionInstruction } from "./instructions/store/createSingleEdition";
import { buySingleEditionInstruction } from "./instructions/store/buySingleEdition";
import {
  StoreConfig,
  MetadataArgs,
  SaleConfig,
  ShortMetadataArgs,
  ShortMetadataArgsJSON,
  TokenMetadataFields,
} from "../types/types";
import {
  holderPDA,
  storePDA,
  itemAccountPDA,
  creatorAuthorityPDA,
  toPublicKey,
  userActivityPDA,
  creatorRegistryPDA,
  getMetadataPDA,
  collectionAuthorityRecord,
  collectorArtistRegistryPDA,
  collectorGlobalRegistryPDA,
  buyPaymentPDA,
  getATAPDA,
  getEditionPDA,
} from "../utility/PdaManager";
import { devnetHolder } from "../utility/Holders";
import BN from "bn.js";
import { uploadFilesIrysInstruction } from "./instructions/store/uploadFilesIryis";
import {
  PROGRAM_CNFT,
  PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "../types/programId";

import { registerCreator } from "../types/instructions/registerCreator";
import { init as Irys } from "./Irys/irys";
import { createApproveCollectionAuthorityInstruction } from "@metaplex-foundation/mpl-token-metadata";
import {
  createCollection,
  CreateCollectionArgs,
  registerCollector,
} from "../types/instructions";
import * as types from "../types/types";

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

  async createCollection(
    payer: Signer,
    collectionDetails: any,
    supply: number,
    metadata: any,
    mutable: Boolean,
    irysData: any
    // symbol: string,
    // name: string
  ) {
    try {
      let instructions = [];
      let signers = [payer];

      if (metadata.uri.length !== 0) throw new Error("-- URI must be empty --");
      const irys = await Irys(payer.publicKey.toBase58(), {});
      const uuid = "random_uuid_per_upload_session";
      const { instruction, signerIrys, metadataUrl } =
        await uploadFilesIrysInstruction(irysData.options, irys, uuid);
      instructions.push(instruction);
      signers.push(signerIrys);

      /***************** */

      const mint = Keypair.generate();
      console.log("mint: ", mint.publicKey);
      const connection = this.connection;
      const updateAuthority = payer.publicKey;
      collectionDetails = collectionDetails || null;

      const mintRent = await connection.getMinimumBalanceForRentExemption(
        MintLayout.span
      );
      console.log("conssdf 1");
      instructions.push(
        SystemProgram.createAccount({
          fromPubkey: payer.publicKey,
          newAccountPubkey: mint.publicKey,
          lamports: mintRent,
          space: MintLayout.span,
          programId: TOKEN_PROGRAM_ID,
        })
      );
      console.log("conssdf 2");

      const owner = payer.publicKey;
      const freezeAuthority = owner;
      instructions.push(
        createInitializeMintInstruction(
          mint.publicKey, //mint
          0, //decimals
          owner, //mintAuthority
          freezeAuthority, //freezeAuthority
          TOKEN_PROGRAM_ID
        )
      );
      signers.push(mint);
      console.log("conssdf 3");

      const ownerATA = await getATAPDA({ owner, mint: mint.publicKey });
      instructions.push(
        createAssociatedTokenAccountInstruction(
          payer.publicKey,
          ownerATA, //associatedTokenAddress
          owner, //walletAddress
          mint.publicKey
        )
      );

      const metadataAccount = await getMetadataPDA(mint.publicKey);

      const create_accounts = {
        metadata: metadataAccount,
        mint: mint.publicKey,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority,
      };

      const create_args = {
        createMetadataAccountArgsV3: {
          data: metadata,
          isMutable: mutable === false ? false : true,
          collectionDetails,
        },
      };
      console.log("conssdf 4");

      instructions.push(
        createCreateMetadataAccountV3Instruction(create_accounts, create_args)
      );
      console.log("conssdf 4.1");

      instructions.push(
        createMintToInstruction(
          mint.publicKey,
          ownerATA,
          owner /*authority*/,
          1,
          []
        )
      );
      console.log("conssdf 4.2");

      const supplies = {
        maxSupply: supply || supply === 0 ? new BN(supply) : null,
      };
      const [editionAccount] = await getEditionPDA(mint.publicKey, false);
      const accounts = {
        edition: editionAccount,
        mint: mint.publicKey,
        updateAuthority,
        mintAuthority: owner,
        payer: payer.publicKey,
        metadata: metadataAccount,
      };
      console.log("conssdf 5");

      const args = { createMasterEditionArgs: { ...supplies } };
      instructions.push(createCreateMasterEditionV3Instruction(accounts, args));

      //if(priority_fee?.rate) instructions.push(ComputeBudgetProgram.setComputeUnitPrice({microLamports: priority_fee.rate}));

      const transaction = new Transaction().add(...instructions);
      console.log("conssdf 6");

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
    } catch (error) {
      console.log("error in create collection: ", error);
    }
  }

  async createSingleEdition(
    payer: Signer,
    storeAccount: PublicKey,
    supply: number,
    metadata: ShortMetadataArgs,
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

    const new_authority = creatorAuthority;

    const [authRecord] = await collectionAuthorityRecord({
      mint: collection_mint,
      new_authority: new_authority,
    });

    let collection_permission = false;

    try {
      const res = await this.connection.getAccountInfo(authRecord);
      if (res) collection_permission = true;
    } catch (e) {
      collection_permission = false;
    }

    if (!collection_permission) {
      const metadataPda = await getMetadataPDA(collection_mint);

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
      // signers.push(new_authority)
    }

    const meta: ShortMetadataArgs = {
      name: metadata.name,
      uri: metadataUrl ? metadataUrl : "",
      uriType: 1,
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      collection: metadata.collection,
      creators: metadata.creators,
      toJSON: function (): ShortMetadataArgsJSON {
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
      user: creator,
      store: storeAccount,
    });

    const [creatorRegistry] = await creatorRegistryPDA({
      user: creator,
      store: storeAccount,
      currency: toPublicKey(PROGRAM_CNFT),
    });

    const registerIX = registerCreator(
      {
        userActivityBump: userActivityBump,
      },
      {
        creatorRegistry,
        userActivity,
        itemAccount,
        store: storeAccount,
        payer: payer.publicKey,
        systemProgram: SystemProgram.programId,
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
    globalStoreAccount: PublicKey,
    collectionAddress: PublicKey,
    creator: PublicKey,
    identifier: number,
    extraAccounts: any[]
  ): Promise<string> {
    const [itemAccount] = await itemAccountPDA({
      creator: creator,
      store: storeAccount,
      identifier: new BN(identifier),
    });

    const [paymentAccount] = await buyPaymentPDA({
      owner: owner,
      itemAccount,
    });

    const holderAccount = storeAccount;

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
      globalStoreAccount,
      identifier,
      extraAccounts,
      creator,
      collectionAddress
    );
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
    console.log("transaction: ", payer.publicKey);
    return sendAndConfirmTransaction(this.connection, transaction, [payer]);
  }
}

export { StoreConfig, MetadataArgs, SaleConfig };
