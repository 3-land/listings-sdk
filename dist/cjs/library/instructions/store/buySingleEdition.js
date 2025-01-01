"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merkleOptions = exports.merkleTree = exports.lutAccount = void 0;
exports.buySingleEditionInstruction = buySingleEditionInstruction;
const web3_js_1 = require("@solana/web3.js");
const programId_1 = require("../../../types/programId");
const instructions_1 = require("../../../types/instructions");
const PdaManager_1 = require("../../../utility/PdaManager");
const utils_1 = require("../../../utility/utils");
const bn_js_1 = require("bn.js");
const types_1 = require("../../../types/types");
const anchor_1 = require("@project-serum/anchor");
const idl_1 = require("./idl");
exports.lutAccount = (0, PdaManager_1.toPublicKey)("EJbrXVgac2wEL2H7FJr38vD7LQpEujWZiSPHSYZ3htCa");
exports.merkleTree = (0, PdaManager_1.toPublicKey)("4GQ32bJ6F6hGnASo836rVbpxWRaeGzj3xkP3pmHnRwiz");
exports.merkleOptions = {
    merkleTree: exports.merkleTree,
    lutAccount: exports.lutAccount,
    mainnet: {
        merkleTree: "Ccw1HJ6U4uVHbmXWogUGA3YCtwQEoeb5ta9zF3o1QJBM",
        lutAccount: "5keha7sPVfoK1A7kpBUaAox11xHBCremixsUmQ1ZDAiG",
    },
    devnet: {
        merkleTree: "2t66TFv7rV69puPqPjU7T9wCwmCGRPnSJy7mbcrrZ5KU",
        lutAccount: "Bpp4MKTVrtr1RajivpbMrEbqbYu8KEFbt1LzW8xAJqkE",
    },
};
const logWrapper = programId_1.SPL_NOOP_PROGRAM_ID;
const bubblegumProgram = programId_1.BUBBLEGUM_PROGRAM_ID;
const tokenMetadataProgram = programId_1.TOKEN_METADATA_PROGRAM_ID;
const compressionProgram = programId_1.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID;
let connection;
async function buySingleEditionInstruction(paymentAccount, itemAccount, packAccount, burnDeposit, poolVault, holderAccount, owner, payer, distributionBumps, data, storeAccount, globalStoreAccount, identifier, extraAccounts, creator, collectionAddress, connectionInstance) {
    const systemProgram = web3_js_1.SystemProgram.programId;
    connection = connectionInstance;
    const endpoint = connection.rpcEndpoint.toLocaleLowerCase();
    const pay = (0, instructions_1.buyPay)({ distributionBumps }, {
        paymentAccount,
        itemAccount,
        packAccount,
        burnDeposit,
        poolVault,
        holderAccount,
        owner,
        payer,
        systemProgram,
    }, extraAccounts, programId_1.PROGRAM_ID);
    let itemCreator = creator;
    const currency = (0, PdaManager_1.toPublicKey)(data?.track?.currency || programId_1.PROGRAM_ID);
    const bubblegumSigner = (0, PdaManager_1.toPublicKey)("4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK");
    const useGlobal = false;
    const merkle = useGlobal
        ? exports.merkleOptions?.merkleTree
        : endpoint.includes("mainnet")
            ? (0, PdaManager_1.toPublicKey)(exports.merkleOptions?.mainnet?.merkleTree)
            : (0, PdaManager_1.toPublicKey)(exports.merkleOptions?.devnet?.merkleTree);
    const [treeAuthority, _bump] = web3_js_1.PublicKey.findProgramAddressSync([merkle.toBuffer()], programId_1.BUBBLEGUM_PROGRAM_ID);
    const seeds = [Buffer.from("tree"), merkle.toBuffer()];
    if (useGlobal) {
        seeds.pop();
    }
    const [merkleManager, treeBump] = web3_js_1.PublicKey.findProgramAddressSync(seeds, programId_1.PROGRAM_CNFT);
    const collectionMint = collectionAddress;
    const [creatorAuthority, creatorAuthBump] = await (0, PdaManager_1.creatorAuthorityPDA)({
        creator: itemCreator,
        store: storeAccount,
    });
    let [collectionAuthorityRecordPda] = await (0, PdaManager_1.collectionAuthorityRecord)({
        mint: collectionMint,
        new_authority: creatorAuthority,
    });
    const collectionMetadata = await (0, PdaManager_1.getMetadataPDA)(collectionMint);
    const [editionAccount] = await (0, PdaManager_1.getEditionPDA)(collectionMint, false);
    const joint_bytes = [...itemCreator.toBytes(), ...currency.toBytes()];
    const proof = {
        proofHash: new bn_js_1.BN((0, utils_1.cyrb53)(joint_bytes, 1)),
        amount: new bn_js_1.BN(1000000),
        currencyVerifier: new bn_js_1.BN((0, utils_1.bytesToU32)(currency.toBytes().slice(0, 4))),
        artistVerifier: new bn_js_1.BN((0, utils_1.bytesToU32)(itemCreator.toBytes().slice(0, 4))),
    };
    if (!data.storeBump) {
        const storedata = await connection.getAccountInfo((0, PdaManager_1.toPublicKey)(globalStoreAccount));
        if (!storedata) {
            throw new Error("-- No Store data store bump");
        }
        const [_, storeBump] = await (0, PdaManager_1.storePDA)({
            storeId: 1,
            creator: itemCreator,
            holder: holderAccount,
        });
        data.storeBump = storeBump;
    }
    if (!data.itemBump) {
        // const storedata = await connection.getAccountInfo(itemAccount);
        // if (!storedata) {
        //   throw new Error("-- No Store data item bump");
        // }
        // const tipo = "Single";
        // const tipofn = "itemAccountPDA";
        const identifierdt = new bn_js_1.BN(identifier);
        const [_, itemBump] = await (0, PdaManager_1.itemAccountPDA)({
            creator: itemCreator,
            store: storeAccount,
            identifier: identifierdt,
        });
        data.itemBump = itemBump;
    }
    if (!data)
        data = {};
    if (!data?.pre)
        data.pre = [];
    if (!data?.post)
        data.post = [];
    const coder = new anchor_1.BorshCoder(idl_1.idl);
    const storedata = await connection.getAccountInfo((0, PdaManager_1.toPublicKey)(storeAccount));
    if (!storedata) {
        throw new Error("no store data in print single");
    }
    const store_decoded = coder.accounts.decode("Store", storedata.data);
    const [_, storeBump] = await (0, PdaManager_1.storePDA)({ ...store_decoded });
    data.storeBump = storeBump;
    const single = (0, instructions_1.printSingle)({
        proof,
        storeBump: data.storeBump,
        creatorAuthBump,
        itemBump: data.itemBump,
        treeBump,
        extra: new types_1.ExtraParameter.None(),
    }, {
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
        buytrackAccount: programId_1.PROGRAM_CNFT,
        revealForMe: programId_1.PROGRAM_CNFT,
        payer,
        logWrapper,
        bubblegumProgram,
        compressionProgram,
        tokenMetadataProgram,
        systemProgram,
    }, programId_1.PROGRAM_ID);
    return [pay, single];
}
//# sourceMappingURL=buySingleEdition.js.map