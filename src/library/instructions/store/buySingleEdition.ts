import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import {
  PROGRAM_ID,
  BUBBLEGUM_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  PROGRAM_CNFT,
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
  toPublicKey,
} from "../../../utility/PdaManager";
import { bytesToU32, cyrb53 } from "../../../utility/utils";
import { BN } from "bn.js";
import { ExtraParameter } from "../../../types/types";
import { getConnection } from "../../../utility/Connection";
import { SOLANA_ENDPOINT } from "../../examples/storeExample";

export let lutAccount = toPublicKey(
  "EJbrXVgac2wEL2H7FJr38vD7LQpEujWZiSPHSYZ3htCa"
);
export let merkleTree = toPublicKey(
  "4GQ32bJ6F6hGnASo836rVbpxWRaeGzj3xkP3pmHnRwiz"
);
export let merkleOptions = {
  merkleTree,
  lutAccount,
  global: {
    merkleTree: "Ccw1HJ6U4uVHbmXWogUGA3YCtwQEoeb5ta9zF3o1QJBM",
    lutAccount: "5keha7sPVfoK1A7kpBUaAox11xHBCremixsUmQ1ZDAiG",
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
  printSingleArgs: PrintSingleArgs,
  printSingleAccounts: PrintSingleAccounts,
  data: any,
  storeAccount: PublicKey
): Promise<TransactionInstruction[]> {
  const systemProgram = PROGRAM_CNFT;

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
    PROGRAM_ID
  );

  let itemCreator = payer;
  const currency = toPublicKey(data?.track?.currency || PROGRAM_ID);

  // const anchor = new Stores();
  // anchor.init({ wallet: payer, forced: false });

  console.log("itemCreator", itemCreator, data);

  const bubblegumSigner = toPublicKey(
    "4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK"
  );

  const useGlobal = merkleOptions?.global;
  const merkle = useGlobal
    ? toPublicKey(merkleOptions?.global?.merkleTree)
    : merkleOptions?.merkleTree;
  const lut = useGlobal
    ? toPublicKey(merkleOptions?.global?.lutAccount)
    : merkleOptions?.lutAccount;
  console.log("merkle", merkle);
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
    "CuD4TrVH5ftqU6tGKpc4LReU92DCGX2gWb5FSSFAAeNt"
  );
  const [creatorAuthority, creatorAuthBump] = await creatorAuthorityPDA({
    creator: itemCreator,
    store: storeAccount,
  });

  console.log("creatorAuthority", creatorAuthority.toBase58()); //DLUEnHLzyLP3wEXbYTjB8mPLUwnqB9bj219z5ENBjDTr

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
  console.log("_amount", _amount);

  //const joint = itemCreator.toBase58()+""+currency.toBase58();

  const joint_bytes = [...itemCreator.toBytes(), ...currency.toBytes()];

  console.log(
    "currency.toBytes().slice(0,4)",
    currency.toBytes().slice(0, 4),
    bytesToU32(currency.toBytes().slice(0, 4))
  );
  const proof = {
    proofHash: new BN(cyrb53(joint_bytes, 1)),
    amount:
      data?.track?.amount || _amount
        ? data?.track?.amount || _amount
        : new BN(0),
    currencyVerifier: bytesToU32(currency.toBytes().slice(0, 4)),
    artistVerifier: bytesToU32(itemCreator.toBytes().slice(0, 4)),
  };

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
    const identifier = new BN(1);
    const [_, itemBump] = await itemAccountPDA({
      creator: itemCreator,
      store: storeAccount,
      identifier: identifier,
    });
    data.itemBump = itemBump;
  }

  if (!data) data = {};
  if (!data?.pre) data.pre = [];
  if (!data?.post) data.post = [];

  const single = printSingle(
    {
      proof,
      storeBump: useGlobal ? 255 - data.storeBump : data.storeBump,
      creatorAuthBump,
      itemBump: data.itemBump,
      treeBump,
      extra: new ExtraParameter.None(),
    },
    {
      treeAuthority,
      itemAccount,
      creatorAuthority,
      merkleTree: merkle,
      merkleManager,
      collectionAuthorityRecordPda,
      editionAccount,
      collectionMetadata,
      collectionMint,
      storeAccount,
      bubblegumSigner,
      payer,
      owner,
      logWrapper,
      bubblegumProgram,
      tokenMetadataProgram,
      compressionProgram,
      systemProgram,
    }
    /*,{managerBump, creatorAuthorityBump}*/
  );
  // const single = printSingle(printSingleArgs, printSingleAccounts, PROGRAM_ID);
  return [pay, single];
}
