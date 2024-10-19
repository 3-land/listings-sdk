import {
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  Signer,
} from "@solana/web3.js";
import { getConnection } from "../utility/Connection";
import { createStoreInstruction } from "./instructions/store/createStore";
import { createSingleEditionInstruction } from "./instructions/store/createSingleEdition";
import { buySingleEditionInstruction } from "./instructions/store/buySingleEdition";
import { StoreConfig, MetadataArgs, SaleConfig } from "../types/types";
import {
  holderPDA,
  storePDA,
  itemAccountPDA,
  itemReserveListPDA,
  creatorAuthorityPDA,
} from "../utility/PdaManager";
import { devnetHolder } from "../utility/Holders";
import BN from "bn.js";
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
    console.log("create store dao: ", devnetHolder, creator, payer);
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
    creator: PublicKey
  ): Promise<string> {
    const [itemAccount] = await itemAccountPDA({
      creator: creator,
      store: storeAccount,
      identifier: new BN(identifier),
    });
    const [creatorAuthority] = await creatorAuthorityPDA({
      creator: creator,
      store: storeAccount,
    });
    const [itemReserveList] = await itemReserveListPDA({ item: itemAccount });

    // if (!itemAccount || !creatorAuthority || itemReserveList) {
    //   throw Error(
    //     `No ItemAccount ${itemAccount} || creatorAuthority ${creatorAuthority} || itemReserveList ${itemReserveList} found!`
    //   );
    // }

    console.log("asdfdsf: ", itemAccount, creatorAuthority, itemReserveList);

    const instruction = createSingleEditionInstruction(
      storeAccount,
      itemAccount,
      creatorAuthority,
      itemReserveList,
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

    const transaction = new Transaction().add(instruction);
    return sendAndConfirmTransaction(this.connection, transaction, [payer]);
  }

  async buySingleEdition(
    payer: Signer,
    paymentAccount: PublicKey,
    itemAccount: PublicKey,
    packAccount: PublicKey,
    burnProgress: PublicKey,
    holderAccount: PublicKey,
    owner: PublicKey,
    distributionBumps: number[]
  ): Promise<string> {
    const instruction = buySingleEditionInstruction(
      paymentAccount,
      itemAccount,
      packAccount,
      burnProgress,
      holderAccount,
      owner,
      payer.publicKey,
      distributionBumps
    );

    const transaction = new Transaction().add(instruction);
    return sendAndConfirmTransaction(this.connection, transaction, [payer]);
  }
}

export { StoreConfig, MetadataArgs, SaleConfig };
