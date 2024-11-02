import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  PROGRAM_ID,
  BUBBLEGUM_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  PROGRAM_CNFT,
  DEVNET_PROGRAM_ID,
} from "../../../types/programId";
import {
  buyPay,
  printSingle,
  PrintSingleAccounts,
  PrintSingleArgs,
} from "../../../types/instructions";
import {
  creatorAuthorityPDA,
  getEditionPDA,
  getMetadataPDA,
  itemAccountPDA,
  storePDA,
  treeAuthority,
  toPublicKey,
  buyPaymentPDA,
} from "../../../utility/PdaManager";
import { bytesToU32, cyrb53 } from "../../../utility/utils";
import { BN } from "bn.js";
import { ExtraParameter } from "../../../types/types";
import { getConnection } from "../../../utility/Connection";
import { SOLANA_ENDPOINT } from "../../examples/storeExample";
import { devnetHolder } from "../../../utility/Holders";
import { BorshCoder, web3 } from "@project-serum/anchor";
import { idl } from "./idl";
export let lutAccount = toPublicKey(
  "EJbrXVgac2wEL2H7FJr38vD7LQpEujWZiSPHSYZ3htCa"
);
export let merkleTree = toPublicKey(
  "4GQ32bJ6F6hGnASo836rVbpxWRaeGzj3xkP3pmHnRwiz"
);
export let merkleOptions = {
  merkleTree,
  lutAccount,
  global_mainnet: {
    merkleTree: "Ccw1HJ6U4uVHbmXWogUGA3YCtwQEoeb5ta9zF3o1QJBM",
    lutAccount: "5keha7sPVfoK1A7kpBUaAox11xHBCremixsUmQ1ZDAiG",
  },
  global_devnet: {
    merkleTree: "2t66TFv7rV69puPqPjU7T9wCwmCGRPnSJy7mbcrrZ5KU",
    lutAccount: "Bpp4MKTVrtr1RajivpbMrEbqbYu8KEFbt1LzW8xAJqkE",
  },
};

const logWrapper = SPL_NOOP_PROGRAM_ID;
const bubblegumProgram = BUBBLEGUM_PROGRAM_ID;
const tokenMetadataProgram = TOKEN_METADATA_PROGRAM_ID;
const compressionProgram = SPL_ACCOUNT_COMPRESSION_PROGRAM_ID;

let connection: Connection;
connection = getConnection(SOLANA_ENDPOINT);

//Pays for the edition, after that it prints one
export async function buySingleEditionInstruction(
  paymentAccount: PublicKey,
  itemAccount: PublicKey,
  packAccount: PublicKey,
  burnDeposit: PublicKey,
  holderAccount: PublicKey,
  owner: PublicKey,
  payer: PublicKey,
  distributionBumps: number[],
  data: any,
  storeAccount: PublicKey,
  identifier: number,
  extraAccounts: any[],
  creator: PublicKey
): Promise<TransactionInstruction[]> {
  const systemProgram = SystemProgram.programId;

  const pay = buyPay(
    { distributionBumps },
    {
      paymentAccount,
      itemAccount,
      packAccount,
      burnDeposit,
      holderAccount,
      owner,
      payer,
      systemProgram,
    },
    extraAccounts,
    PROGRAM_ID
  );

  let itemCreator = creator;
  const currency = toPublicKey(data?.track?.currency || PROGRAM_ID);

  const bubblegumSigner = toPublicKey(
    "4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK"
  );

  const useGlobal_devnet = merkleOptions?.global_devnet;
  const useGlobal = useGlobal_devnet;
  const merkle = useGlobal_devnet
    ? toPublicKey(merkleOptions?.global_devnet?.merkleTree)
    : merkleOptions?.merkleTree;

  // const lut = useGlobal
  //   ? toPublicKey(merkleOptions?.global?.lutAccount)
  //   : merkleOptions?.lutAccount;
  // const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
  //   [merkle.toBuffer()],
  //   PROGRAM_ID
  // );

  // const [treeAuthority2] = treeAuthority({ tree: merkle });

  const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
    [merkle.toBuffer()],
    BUBBLEGUM_PROGRAM_ID
  );

  const seeds = [Buffer.from("tree"), merkle.toBuffer()];
  if (useGlobal) {
    seeds.pop();
  }

  const [merkleManager, treeBump] = PublicKey.findProgramAddressSync(
    seeds,
    PROGRAM_ID
  );

  const collectionMint = toPublicKey(
    "2rQq34FJG1613i7H8cDfxuGCtEjJmFAUNbAPJqK699oD"
  ); //CuD4TrVH5ftqU6tGKpc4LReU92DCGX2gWb5FSSFAAeNt
  const [creatorAuthority, creatorAuthBump] = await creatorAuthorityPDA({
    creator: itemCreator,
    store: storeAccount,
  });

  const collectionAuthorityRecordPda = BUBBLEGUM_PROGRAM_ID;

  const collectionMetadata = await getMetadataPDA(collectionMint);
  const editionAccount = await getEditionPDA(collectionMint, false);

  // const systemProgram = toPublicKey("11111111111111111111111111111111");
  //const [buytrackAccount, buytrackAccountBump] = await anchor.buytrackPDA({item:itemAccount, owner});
  const buytrackAccount = PROGRAM_ID;

  //console.log("ACCOUNTSZSS",{treeAuthority,paymentAccount, buytrackAccount, itemAccount, creatorAuthority, merkleTree, merkleManager, collectionAuthorityRecordPda, editionAccount, collectionMetadata, collectionMint,packProgram:PROGRAM_CNFT, storeAccount, bubblegumSigner, payer, owner, logWrapper, bubblegumProgram, tokenMetadataProgram, compressionProgram});

  /*
	pub proof_hash: u64, //8
	pub amount: u64, //8
	pub currency_verifier:u32, //4
	pub artist_verifier:u32 //4
	*/
  let _amount = new BN(1);

  //const joint = itemCreator.toBase58()+""+currency.toBase58();

  const joint_bytes = [...itemCreator.toBytes(), ...currency.toBytes()];

  console.log(
    "currency.toBytes().slice(0,4)",
    currency.toBytes().slice(0, 4),
    bytesToU32(currency.toBytes().slice(0, 4))
  );
  // const proof = {
  //   proofHash: new BN(cyrb53(joint_bytes, 1)),
  //   amount:
  //     data?.track?.amount || _amount
  //       ? data?.track?.amount || _amount
  //       : new BN(0),
  //   currencyVerifier: bytesToU32(currency.toBytes().slice(0, 4)),
  //   artistVerifier: bytesToU32(itemCreator.toBytes().slice(0, 4)),
  // };

  const proof = {
    proofHash: new BN(cyrb53(joint_bytes, 1)),
    // amount: new BN(data?.track?.amount || 1), // Ensure it's always a BN with a default of 1
    // amount: [...new BN(1).toArrayLike(Buffer, "le", 8)],
    amount: new BN(1000000),
    currencyVerifier: bytesToU32(currency.toBytes().slice(0, 4)),
    artistVerifier: bytesToU32(itemCreator.toBytes().slice(0, 4)),
  };

  // Add this before creating the instruction to debug the final values
  console.log("Final proof values:", {
    proofHash: proof.proofHash.toString(),
    amount: proof.amount.toString(),
    currencyVerifier: proof.currencyVerifier,
    artistVerifier: proof.artistVerifier,
  });

  // Verify the amount is what you expect
  // if (!proof.amount.eq(new BN(1))) {
  //   console.warn("Warning: amount is not 1:", proof.amount.toString());
  // }

  if (!data.storeBump) {
    const storedata = await connection.getAccountInfo(
      toPublicKey(storeAccount)
    );
    if (!storedata) {
      throw new Error("-- No Store data store bump");
    }
    // const store_decoded = anchor["store"].coder.accounts.decode(
    //   "Store",
    //   storedata.data
    // );

    const [_, storeBump] = await storePDA({
      storeId: 1,
      creator: itemCreator,
      holder: holderAccount,
    });
    data.storeBump = storeBump;
  }

  if (!data.itemBump) {
    const storedata = await connection.getAccountInfo(itemAccount);
    if (!storedata) {
      throw new Error("-- No Store data item bump");
    }
    const tipo = "Single";
    const tipofn = "itemAccountPDA";
    // const decoded = anchor[tipo.toLowerCase()].coder.accounts.decode(
    //   tipo,
    //   storedata.data
    // );
    const identifierdt = new BN(identifier);
    const [_, itemBump] = await itemAccountPDA({
      creator: itemCreator,
      store: storeAccount,
      identifier: identifierdt,
    });
    data.itemBump = itemBump;
  }

  if (!data) data = {};
  if (!data?.pre) data.pre = [];
  if (!data?.post) data.post = [];
  console.log("pay ix: ", pay);
  console.log("args: ", {
    proof,
    storeBump: useGlobal ? 255 - data.storeBump : data.storeBump,
    creatorAuthBump,
    itemBump: data.itemBump,
    treeBump,
    extra: new ExtraParameter.None(),
  });

  // const [payerPaymentAccount] = await buyPaymentPDA({
  //   owner: payer,
  //   itemAccount,
  // });

  // let [storeAccAddr] = web3.PublicKey.findProgramAddressSync(
  //   [Buffer.from("store_account"), storeAccount.toBytes()],
  //   toPublicKey(PROGRAM_ID)
  // );

  // const [_, storeBump] = await storePDA({
  //   storeId: "",
  //   creator: "",
  //   holder: "",
  // });

  console.log("storedata b4");
  const coder = new BorshCoder(idl);
  // if (true) {
  const storedata = await connection.getAccountInfo(toPublicKey(storeAccount));
  console.log("storedata: ", storedata);
  if (!storedata) {
    throw new Error("no store data in print single");
  }
  const store_decoded = coder.accounts.decode("Store", storedata.data);
  console.log("store_decoded: ", store_decoded);
  const [_, storeBump] = await storePDA({ ...store_decoded });
  data.storeBump = storeBump;
  console.log("store bump: ", data.storeBump);
  // }

  console.log("Bumps:", {
    storeBump: useGlobal ? 255 - data.storeBump : data.storeBump,
    creatorAuthBump,
    itemBump: data.itemBump,
    treeBump,
  });

  console.log("Proof:", {
    proofHash: proof.proofHash.toString(),
    amount: proof.amount.toString(),
    currencyVerifier: proof.currencyVerifier,
    artistVerifier: proof.artistVerifier,
  });

  console.log("las cuentas: ", {
    owner,
    itemAccount,
    treeAuthority,
    storeAccount,
    creatorAuthority,
    paymentAccount: PROGRAM_CNFT, //empty on solscan
    merkleTree: merkle,
    merkleManager,
    collectionAuthorityRecordPda,
    editionAccount, //empty on solscan
    collectionMetadata,
    collectionMint,
    bubblegumSigner,
    buytrackAccount: PROGRAM_CNFT,
    revealForMe: PROGRAM_CNFT,
    payer,
    logWrapper,
    bubblegumProgram,
    compressionProgram,
    tokenMetadataProgram,
    systemProgram,
  });

  const single = printSingle(
    {
      proof,
      storeBump: data.storeBump,
      // storeBump: useGlobal ? 255 - data.storeBump : data.storeBump,
      creatorAuthBump,
      itemBump: data.itemBump,
      treeBump,
      extra: new ExtraParameter.None(),
    },
    {
      owner,
      itemAccount,
      treeAuthority,
      storeAccount,
      creatorAuthority,
      paymentAccount,
      merkleTree: merkle,
      merkleManager,
      collectionAuthorityRecordPda,
      editionAccount,
      collectionMetadata,
      collectionMint,
      bubblegumSigner,
      buytrackAccount: PROGRAM_CNFT,
      revealForMe: PROGRAM_CNFT,
      payer,
      logWrapper,
      bubblegumProgram,
      compressionProgram,
      tokenMetadataProgram,
      systemProgram,
    },
    PROGRAM_ID
    /*,{managerBump, creatorAuthorityBump}*/
  );
  console.log("single ix: ", single);
  // const single = printSingle(printSingleArgs, printSingleAccounts, PROGRAM_ID);
  return [pay, single];
}
