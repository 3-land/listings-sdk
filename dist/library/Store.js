var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey, Transaction, sendAndConfirmTransaction, SystemProgram, Keypair, } from "@solana/web3.js";
import { createCreateMasterEditionV3Instruction, createCreateMetadataAccountV3Instruction, } from "@metaplex-foundation/mpl-token-metadata";
import { MintLayout, createAssociatedTokenAccountInstruction, createMintToInstruction, createInitializeMintInstruction, } from "@solana/spl-token";
import { getConnection } from "../utility/Connection";
import { createStoreInstruction } from "./instructions/store/createStore";
import { createSingleEditionInstruction } from "./instructions/store/createSingleEdition";
import { buySingleEditionInstruction } from "./instructions/store/buySingleEdition";
import { StoreConfig, MetadataArgs, SaleConfig, } from "../types/types";
import { holderPDA, storePDA, itemAccountPDA, creatorAuthorityPDA, toPublicKey, userActivityPDA, creatorRegistryPDA, getMetadataPDA, collectionAuthorityRecord, collectorArtistRegistryPDA, collectorGlobalRegistryPDA, buyPaymentPDA, getATAPDA, getEditionPDA, } from "../utility/PdaManager";
import { devnetHolder } from "../utility/Holders";
import BN from "bn.js";
import { uploadFilesIrysInstruction } from "./instructions/store/uploadFilesIryis";
import { DEVNET_PROGRAM_ID, PROGRAM_CNFT, PROGRAM_ID, TOKEN_PROGRAM_ID, } from "../types/programId";
import { registerCreator } from "../types/instructions/registerCreator";
import { init as Irys } from "./Irys/irys";
import { createApproveCollectionAuthorityInstruction } from "@metaplex-foundation/mpl-token-metadata";
import { registerCollector } from "../types/instructions";
import { validateBuySingleArgs, validateCollectionArgs, validateIdentifier, validateMetadata, validateSaleConfig, validateStoreConfig, validateSupply, ValidationError, } from "../utility/validation";
import { NetworkType, NETWORK_CONFIGS } from "../utility/config";
import { Single } from "../types/accounts";
const extraAccount = [
    {
        pubkey: new PublicKey("GyPCu89S63P9NcCQAtuSJesiefhhgpGWrNVJs4bF2cSK"), //global store
        isSigner: false,
        isWritable: true,
    },
];
export class Store {
    constructor(options = {}) {
        const { network = NetworkType.DEVNET, 
        // network = NetworkType.MAINNET,
        customEndpoint, customConfig, } = options;
        const baseConfig = NETWORK_CONFIGS[network];
        this.networkConfig = Object.assign(Object.assign(Object.assign({}, baseConfig), customConfig), { endpoint: customEndpoint || baseConfig.endpoint });
        this.connection = getConnection(this.networkConfig.endpoint);
    }
    createStore(payer, name, storeConfig, creator, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer || !payer.publicKey) {
                throw new ValidationError("Invalid payer");
            }
            if (!name || name.length > 32) {
                throw new ValidationError("Store name is required and must be <= 32 characters");
            }
            storeId = Math.floor(Math.random() * 10000);
            creator = payer.publicKey;
            validateStoreConfig(storeConfig);
            validateIdentifier(storeId);
            try {
                const [holderAccount] = yield holderPDA({
                    creator: devnetHolder.creator,
                    slot: devnetHolder.slot,
                });
                const [storeAccount] = yield storePDA({
                    storeId: storeId,
                    creator: creator.toString(),
                    holder: holderAccount.toString(),
                });
                const instruction = createStoreInstruction(holderAccount, storeAccount, payer.publicKey, name, storeConfig, storeId);
                const transaction = new Transaction().add(instruction);
                return sendAndConfirmTransaction(this.connection, transaction, [payer]);
            }
            catch (error) {
                if (error instanceof ValidationError) {
                    throw error;
                }
                throw new Error(`Failed to create store: ${error}`);
            }
        });
    }
    createCollection(payer_1, collectionDetails_1, metadata_1, irysData_1) {
        return __awaiter(this, arguments, void 0, function* (payer, collectionDetails, metadata, irysData, mutable = false, supply = 0) {
            try {
                if (!payer || !payer.publicKey) {
                    throw new ValidationError("Invalid payer");
                }
                validateCollectionArgs(collectionDetails, supply, metadata, irysData);
                if (typeof mutable !== "boolean") {
                    throw new ValidationError("Mutable parameter must be a boolean");
                }
                if (metadata.uri.length !== 0) {
                    throw new ValidationError("URI must be empty");
                }
                let instructions = [];
                let signers = [payer];
                if (metadata.uri.length !== 0)
                    throw new Error("-- URI must be empty --");
                const irys = yield Irys(payer.publicKey.toBase58(), {});
                const uuid = "random_uuid_per_upload_session";
                const { instruction, signerIrys, metadataUrl } = yield uploadFilesIrysInstruction(irysData.options, irys, uuid);
                instructions.push(instruction);
                signers.push(signerIrys);
                const mint = Keypair.generate();
                const connection = this.connection;
                const updateAuthority = payer.publicKey;
                collectionDetails = collectionDetails || null;
                const mintRent = yield connection.getMinimumBalanceForRentExemption(MintLayout.span);
                instructions.push(SystemProgram.createAccount({
                    fromPubkey: payer.publicKey,
                    newAccountPubkey: mint.publicKey,
                    lamports: mintRent,
                    space: MintLayout.span,
                    programId: TOKEN_PROGRAM_ID,
                }));
                const owner = payer.publicKey;
                const freezeAuthority = owner;
                instructions.push(createInitializeMintInstruction(mint.publicKey, //mint
                0, //decimals
                owner, //mintAuthority
                freezeAuthority, //freezeAuthority
                TOKEN_PROGRAM_ID));
                signers.push(mint);
                const ownerATA = yield getATAPDA({ owner, mint: mint.publicKey });
                instructions.push(createAssociatedTokenAccountInstruction(payer.publicKey, ownerATA, //associatedTokenAddress
                owner, //walletAddress
                mint.publicKey));
                const metadataAccount = yield getMetadataPDA(mint.publicKey);
                const create_accounts = {
                    metadata: metadataAccount,
                    mint: mint.publicKey,
                    mintAuthority: payer.publicKey,
                    payer: payer.publicKey,
                    updateAuthority,
                };
                const metadataObj = Object.assign(Object.assign({}, metadata), { uri: metadataUrl });
                console.log("metatadaobj: ", metadataObj);
                const create_args = {
                    createMetadataAccountArgsV3: {
                        data: metadataObj,
                        isMutable: mutable === false ? false : true,
                        collectionDetails,
                    },
                };
                instructions.push(createCreateMetadataAccountV3Instruction(create_accounts, create_args));
                instructions.push(createMintToInstruction(mint.publicKey, ownerATA, owner /*authority*/, 1, []));
                const supplies = {
                    maxSupply: supply || supply === 0 ? new BN(supply) : null,
                };
                const [editionAccount] = yield getEditionPDA(mint.publicKey, false);
                const accounts = {
                    edition: editionAccount,
                    mint: mint.publicKey,
                    updateAuthority,
                    mintAuthority: owner,
                    payer: payer.publicKey,
                    metadata: metadataAccount,
                };
                const args = { createMasterEditionArgs: Object.assign({}, supplies) };
                instructions.push(createCreateMasterEditionV3Instruction(accounts, args));
                const transaction = new Transaction().add(...instructions);
                const sendedconfirmedTransaction = yield sendAndConfirmTransaction(this.connection, transaction, signers);
                const { errors, succeeds } = yield (irys === null || irys === void 0 ? void 0 : irys.uploadFiles({
                    uuid,
                    signature: sendedconfirmedTransaction,
                }));
                return sendedconfirmedTransaction;
            }
            catch (error) {
                if (error instanceof ValidationError) {
                    throw error;
                }
                throw new Error(`Failed to create collection: ${error}`);
            }
        });
    }
    createSingleEdition(payer, storeAccount, supply, metadata, saleConfig, category, superCategory, eventCategory, hashTraits, collection, irysData) {
        return __awaiter(this, void 0, void 0, function* () {
            const identifier = Math.floor(Math.random() * 1000000);
            const creator = payer.publicKey;
            if (!payer || !payer.publicKey) {
                throw new ValidationError("Invalid payer");
            }
            if (!storeAccount) {
                throw new ValidationError("Store account is required");
            }
            validateSupply(supply);
            validateMetadata(metadata);
            validateSaleConfig(saleConfig);
            validateIdentifier(identifier);
            try {
                const irys = yield Irys(payer.publicKey.toBase58(), {});
                const uuid = "random_uuid_per_upload_session";
                const [itemAccount] = yield itemAccountPDA({
                    creator: creator,
                    store: storeAccount,
                    identifier: new BN(identifier),
                });
                const [creatorAuthority] = yield creatorAuthorityPDA({
                    creator: payer.publicKey,
                    store: storeAccount,
                });
                let instructions = [];
                let signers = [payer];
                const { instruction, signerIrys, metadataUrl } = yield uploadFilesIrysInstruction(irysData.options, irys, uuid);
                instructions.push(instruction);
                signers.push(signerIrys);
                const collection_mint = toPublicKey(collection);
                const new_authority = creatorAuthority;
                const [authRecord] = yield collectionAuthorityRecord({
                    mint: collection_mint,
                    new_authority: new_authority,
                });
                let collection_permission = false;
                try {
                    const res = yield this.connection.getAccountInfo(authRecord);
                    if (res)
                        collection_permission = true;
                }
                catch (e) {
                    collection_permission = false;
                }
                if (!collection_permission) {
                    const metadataPda = yield getMetadataPDA(collection_mint);
                    const accounts = {
                        collectionAuthorityRecord: authRecord,
                        newCollectionAuthority: new_authority,
                        updateAuthority: payer.publicKey,
                        payer: payer.publicKey,
                        metadata: metadataPda,
                        mint: collection_mint,
                    };
                    const approveInstruction = createApproveCollectionAuthorityInstruction(accounts);
                    instructions.push(approveInstruction);
                    // signers.push(new_authority)
                }
                console.log("metadataurl: ", metadataUrl);
                const meta = {
                    name: metadata.name,
                    uri: metadataUrl ? metadataUrl.split(".net/")[1] : "",
                    uriType: 1,
                    sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
                    collection: metadata.collection,
                    creators: metadata.creators,
                    toJSON: function () {
                        throw new Error("Function not implemented.");
                    },
                    toEncodable: function () {
                        throw new Error("Function not implemented.");
                    },
                };
                console.log("meta: ", meta);
                const instructionSing = createSingleEditionInstruction(storeAccount, itemAccount, creatorAuthority, PROGRAM_ID, payer.publicKey, payer.publicKey, supply, meta, saleConfig, identifier, category, superCategory, eventCategory, hashTraits);
                instructions.push(instructionSing);
                const [userActivity, userActivityBump] = yield userActivityPDA({
                    user: creator,
                    store: storeAccount,
                });
                const [creatorRegistry] = yield creatorRegistryPDA({
                    user: creator,
                    store: storeAccount,
                    currency: toPublicKey(PROGRAM_CNFT),
                });
                const registerIX = registerCreator({
                    userActivityBump: userActivityBump,
                }, {
                    creatorRegistry,
                    userActivity,
                    itemAccount,
                    store: storeAccount,
                    payer: payer.publicKey,
                    systemProgram: SystemProgram.programId,
                });
                instructions.push(registerIX);
                const transaction = new Transaction().add(...instructions);
                const sendedconfirmedTransaction = yield sendAndConfirmTransaction(this.connection, transaction, signers);
                const { errors, succeeds } = yield (irys === null || irys === void 0 ? void 0 : irys.uploadFiles({
                    uuid,
                    signature: sendedconfirmedTransaction,
                }));
                return sendedconfirmedTransaction;
            }
            catch (error) {
                if (error instanceof ValidationError) {
                    throw error;
                }
                throw new Error(`Failed to create single edition: ${error}`);
            }
        });
    }
    buySingleEdition(payer_1, distributionBumps_1, itemAddress_1) {
        return __awaiter(this, arguments, void 0, function* (payer, distributionBumps, itemAddress, extraAccounts = extraAccount, globalStoreAccount = DEVNET_PROGRAM_ID, packAccount = PROGRAM_CNFT, burnProgress = PROGRAM_CNFT, poolVault = PROGRAM_CNFT) {
            var _a, _b, _c;
            try {
                const owner = payer.publicKey;
                //const storedata = await this.connection.getAccountInfo(itemAddress);
                const single = yield Single.fetch(this.connection, itemAddress, PROGRAM_ID);
                const identifier = parseInt(((_a = single === null || single === void 0 ? void 0 : single.identifier) === null || _a === void 0 ? void 0 : _a.toString()) || "none");
                const creator = single === null || single === void 0 ? void 0 : single.creator;
                const storeAccount = single === null || single === void 0 ? void 0 : single.holder;
                const collectionAddress = (_c = (_b = single === null || single === void 0 ? void 0 : single.item) === null || _b === void 0 ? void 0 : _b.metadata) === null || _c === void 0 ? void 0 : _c.collection;
                validateIdentifier(identifier);
                if (!creator)
                    throw new Error("Missing creator...");
                if (!storeAccount)
                    throw new Error("Missing creator...");
                if (!collectionAddress)
                    throw new Error("Missing collection...");
                validateBuySingleArgs(payer, packAccount, burnProgress, owner, distributionBumps, globalStoreAccount, extraAccounts, collectionAddress.key, storeAccount, creator);
                const [itemAccount] = yield itemAccountPDA({
                    creator: creator,
                    store: storeAccount,
                    identifier: new BN(identifier),
                });
                const [paymentAccount] = yield buyPaymentPDA({
                    owner: owner,
                    itemAccount,
                });
                const holderAccount = storeAccount;
                let instructions = [];
                const instruction = yield buySingleEditionInstruction(paymentAccount, itemAccount, packAccount, burnProgress, poolVault, holderAccount, owner, payer.publicKey, distributionBumps, {}, storeAccount, globalStoreAccount, identifier, extraAccounts, creator, collectionAddress.key, this.connection);
                instructions.push(...instruction);
                const [userActivity, userActivityBump] = yield userActivityPDA({
                    user: payer.publicKey,
                    store: storeAccount,
                });
                const [collectorRegistry] = yield collectorArtistRegistryPDA({
                    user: payer.publicKey,
                    artist: creator,
                    store: storeAccount,
                    currency: toPublicKey(PROGRAM_CNFT),
                });
                const [creatorRegistry, creatorBump] = yield creatorRegistryPDA({
                    user: creator,
                    currency: toPublicKey(PROGRAM_CNFT),
                    store: storeAccount,
                });
                const [collectorGlobalRegistry] = yield collectorGlobalRegistryPDA({
                    user: payer.publicKey,
                    currency: toPublicKey(PROGRAM_CNFT),
                    store: storeAccount,
                });
                const registerIX = registerCollector({
                    creatorBump: creatorBump,
                    activityBump: userActivityBump,
                }, {
                    collectorArtistRegistry: collectorRegistry,
                    collectorGlobalRegistry: collectorGlobalRegistry,
                    userActivity: userActivity,
                    creatorRegistry: creatorRegistry,
                    store: storeAccount,
                    payer: payer.publicKey,
                    systemProgram: SystemProgram.programId,
                });
                instructions.push(registerIX);
                const transaction = new Transaction().add(...instructions);
                console.log("transaction: ", payer.publicKey);
                return sendAndConfirmTransaction(this.connection, transaction, [payer]);
            }
            catch (error) {
                if (error instanceof ValidationError) {
                    throw error;
                }
                throw new Error(`Failed to buy single edition: ${error}`);
            }
        });
    }
}
export { StoreConfig, MetadataArgs, SaleConfig };
