var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey, SystemProgram, } from "@solana/web3.js";
import { PROGRAM_ID, BUBBLEGUM_PROGRAM_ID, SPL_NOOP_PROGRAM_ID, TOKEN_METADATA_PROGRAM_ID, SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, PROGRAM_CNFT, } from "../../../types/programId";
import { buyPay, printSingle } from "../../../types/instructions";
import { creatorAuthorityPDA, getEditionPDA, getMetadataPDA, itemAccountPDA, storePDA, toPublicKey, collectionAuthorityRecord, } from "../../../utility/PdaManager";
import { bytesToU32, cyrb53 } from "../../../utility/utils";
import { BN } from "bn.js";
import { ExtraParameter } from "../../../types/types";
import { BorshCoder } from "@project-serum/anchor";
import { idl } from "./idl";
export let lutAccount = toPublicKey("EJbrXVgac2wEL2H7FJr38vD7LQpEujWZiSPHSYZ3htCa");
export let merkleTree = toPublicKey("4GQ32bJ6F6hGnASo836rVbpxWRaeGzj3xkP3pmHnRwiz");
export let merkleOptions = {
    merkleTree,
    lutAccount,
    mainnet: {
        merkleTree: "Ccw1HJ6U4uVHbmXWogUGA3YCtwQEoeb5ta9zF3o1QJBM",
        lutAccount: "5keha7sPVfoK1A7kpBUaAox11xHBCremixsUmQ1ZDAiG",
    },
    devnet: {
        merkleTree: "2t66TFv7rV69puPqPjU7T9wCwmCGRPnSJy7mbcrrZ5KU",
        lutAccount: "Bpp4MKTVrtr1RajivpbMrEbqbYu8KEFbt1LzW8xAJqkE",
    },
};
const logWrapper = SPL_NOOP_PROGRAM_ID;
const bubblegumProgram = BUBBLEGUM_PROGRAM_ID;
const tokenMetadataProgram = TOKEN_METADATA_PROGRAM_ID;
const compressionProgram = SPL_ACCOUNT_COMPRESSION_PROGRAM_ID;
let connection;
export function buySingleEditionInstruction(paymentAccount, itemAccount, packAccount, burnDeposit, poolVault, holderAccount, owner, payer, distributionBumps, data, storeAccount, globalStoreAccount, identifier, extraAccounts, creator, collectionAddress, connectionInstance) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const systemProgram = SystemProgram.programId;
        connection = connectionInstance;
        const endpoint = connection.rpcEndpoint.toLocaleLowerCase();
        const pay = buyPay({ distributionBumps }, {
            paymentAccount,
            itemAccount,
            packAccount,
            burnDeposit,
            poolVault,
            holderAccount,
            owner,
            payer,
            systemProgram,
        }, extraAccounts, PROGRAM_ID);
        let itemCreator = creator;
        const currency = toPublicKey(((_a = data === null || data === void 0 ? void 0 : data.track) === null || _a === void 0 ? void 0 : _a.currency) || PROGRAM_ID);
        const bubblegumSigner = toPublicKey("4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK");
        const useGlobal = false;
        const merkle = useGlobal
            ? merkleOptions === null || merkleOptions === void 0 ? void 0 : merkleOptions.merkleTree
            : endpoint.includes("mainnet")
                ? toPublicKey((_b = merkleOptions === null || merkleOptions === void 0 ? void 0 : merkleOptions.mainnet) === null || _b === void 0 ? void 0 : _b.merkleTree)
                : toPublicKey((_c = merkleOptions === null || merkleOptions === void 0 ? void 0 : merkleOptions.devnet) === null || _c === void 0 ? void 0 : _c.merkleTree);
        const [treeAuthority, _bump] = PublicKey.findProgramAddressSync([merkle.toBuffer()], BUBBLEGUM_PROGRAM_ID);
        const seeds = [Buffer.from("tree"), merkle.toBuffer()];
        if (useGlobal) {
            seeds.pop();
        }
        const [merkleManager, treeBump] = PublicKey.findProgramAddressSync(seeds, PROGRAM_CNFT);
        const collectionMint = collectionAddress;
        const [creatorAuthority, creatorAuthBump] = yield creatorAuthorityPDA({
            creator: itemCreator,
            store: storeAccount,
        });
        let [collectionAuthorityRecordPda] = yield collectionAuthorityRecord({
            mint: collectionMint,
            new_authority: creatorAuthority,
        });
        const collectionMetadata = yield getMetadataPDA(collectionMint);
        const [editionAccount] = yield getEditionPDA(collectionMint, false);
        const joint_bytes = [...itemCreator.toBytes(), ...currency.toBytes()];
        const proof = {
            proofHash: new BN(cyrb53(joint_bytes, 1)),
            amount: new BN(1000000),
            currencyVerifier: new BN(bytesToU32(currency.toBytes().slice(0, 4))),
            artistVerifier: new BN(bytesToU32(itemCreator.toBytes().slice(0, 4))),
        };
        if (!data.storeBump) {
            const storedata = yield connection.getAccountInfo(toPublicKey(globalStoreAccount));
            if (!storedata) {
                throw new Error("-- No Store data store bump");
            }
            const [_, storeBump] = yield storePDA({
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
            const identifierdt = new BN(identifier);
            const [_, itemBump] = yield itemAccountPDA({
                creator: itemCreator,
                store: storeAccount,
                identifier: identifierdt,
            });
            data.itemBump = itemBump;
        }
        if (!data)
            data = {};
        if (!(data === null || data === void 0 ? void 0 : data.pre))
            data.pre = [];
        if (!(data === null || data === void 0 ? void 0 : data.post))
            data.post = [];
        const coder = new BorshCoder(idl);
        const storedata = yield connection.getAccountInfo(toPublicKey(storeAccount));
        if (!storedata) {
            throw new Error("no store data in print single");
        }
        const store_decoded = coder.accounts.decode("Store", storedata.data);
        const [_, storeBump] = yield storePDA(Object.assign({}, store_decoded));
        data.storeBump = storeBump;
        const single = printSingle({
            proof,
            storeBump: data.storeBump,
            creatorAuthBump,
            itemBump: data.itemBump,
            treeBump,
            extra: new ExtraParameter.None(),
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
            buytrackAccount: PROGRAM_CNFT,
            revealForMe: PROGRAM_CNFT,
            payer,
            logWrapper,
            bubblegumProgram,
            compressionProgram,
            tokenMetadataProgram,
            systemProgram,
        }, PROGRAM_ID);
        return [pay, single];
    });
}
