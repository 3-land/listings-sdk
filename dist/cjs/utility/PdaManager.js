"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getATAPDA = exports.treeAuthority = exports.buyPaymentPDA = exports.collectorGlobalRegistryPDA = exports.collectorArtistRegistryPDA = exports.userActivityPDA = exports.creatorRegistryPDA = exports.collectionAuthorityRecord = exports.getEditionPDA = exports.getMetadataPDA = exports.toPublicKey = exports.METADATA_PREFIX = void 0;
exports.holderPDA = holderPDA;
exports.holderAccountPDA = holderAccountPDA;
exports.storePDA = storePDA;
exports.creatorAuthorityPDA = creatorAuthorityPDA;
exports.itemAccountPDA = itemAccountPDA;
exports.itemReserveListPDA = itemReserveListPDA;
const bn_js_1 = __importDefault(require("bn.js"));
const programId_1 = require("../types/programId");
const web3_js_1 = require("@solana/web3.js");
exports.METADATA_PREFIX = "metadata";
function holderPDA({ creator, slot }) {
    if (!slot)
        slot = 0;
    creator = (0, exports.toPublicKey)(creator);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("holder"),
        creator.toBytes(),
        new bn_js_1.default(slot).toArrayLike(Buffer, "le", 8),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
}
function holderAccountPDA({ creator, slot }) {
    if (!slot)
        slot = 0;
    creator = (0, exports.toPublicKey)(creator);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("holder_account"),
        creator.toBytes(),
        new bn_js_1.default(slot).toArrayLike(Buffer, "le", 8),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
}
function storePDA({ storeId, creator, holder }) {
    holder = (0, exports.toPublicKey)(holder);
    creator = (0, exports.toPublicKey)(creator);
    if (!(storeId === null || storeId === void 0 ? void 0 : storeId.toNumber))
        storeId = new bn_js_1.default(storeId);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("store"),
        holder.toBytes(),
        creator.toBytes(),
        storeId.toArrayLike(Buffer, "le", 2),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
}
function creatorAuthorityPDA({ creator, store }) {
    store = (0, exports.toPublicKey)(store);
    creator = (0, exports.toPublicKey)(creator);
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from("creator_authority"), store.toBytes(), creator.toBytes()], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
}
function itemAccountPDA({ creator, store, identifier }) {
    store = (0, exports.toPublicKey)(store);
    creator = (0, exports.toPublicKey)(creator);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("item_account"),
        store.toBytes(),
        creator.toBytes(),
        identifier.toArrayLike(Buffer, "le", 8),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
}
function itemReserveListPDA({ item }) {
    item = (0, exports.toPublicKey)(item);
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from("item_reserve_list"), item.toBytes()], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
}
const toPublicKey = (key) => {
    if (typeof key !== "string")
        return key;
    const PubKeysInternedMap = new Map();
    let result = PubKeysInternedMap.get(key);
    if (!result) {
        result = new web3_js_1.PublicKey(key);
        PubKeysInternedMap.set(key, result);
    }
    return result;
};
exports.toPublicKey = toPublicKey;
const getMetadataPDA = (mint) => __awaiter(void 0, void 0, void 0, function* () {
    const [publicKey] = yield web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        programId_1.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ], programId_1.TOKEN_METADATA_PROGRAM_ID //PROGRAM_ID
    );
    return publicKey;
});
exports.getMetadataPDA = getMetadataPDA;
const getEditionPDA = (mint, full) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress([
        Buffer.from(exports.METADATA_PREFIX),
        (0, exports.toPublicKey)(programId_1.TOKEN_METADATA_PROGRAM_ID).toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
    ], (0, exports.toPublicKey)(programId_1.TOKEN_METADATA_PROGRAM_ID));
});
exports.getEditionPDA = getEditionPDA;
const collectionAuthorityRecord = (_a) => __awaiter(void 0, [_a], void 0, function* ({ mint, new_authority, }) {
    mint = (0, exports.toPublicKey)(mint);
    new_authority = (0, exports.toPublicKey)(new_authority);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        programId_1.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("collection_authority"),
        new_authority.toBuffer(),
    ], programId_1.TOKEN_METADATA_PROGRAM_ID);
});
exports.collectionAuthorityRecord = collectionAuthorityRecord;
const creatorRegistryPDA = ({ user, currency, store }) => {
    user = (0, exports.toPublicKey)(user);
    currency = (0, exports.toPublicKey)(currency);
    store = (0, exports.toPublicKey)(store);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("creator_registry"),
        currency.toBytes(),
        user.toBytes(),
        store.toBytes(),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
};
exports.creatorRegistryPDA = creatorRegistryPDA;
const userActivityPDA = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, store }) {
    user = (0, exports.toPublicKey)(user);
    store = (0, exports.toPublicKey)(store);
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from("user_activity_tracking"), user.toBytes(), store.toBytes()], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
});
exports.userActivityPDA = userActivityPDA;
const collectorArtistRegistryPDA = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, artist, currency, store, }) {
    user = (0, exports.toPublicKey)(user);
    currency = (0, exports.toPublicKey)(currency);
    artist = (0, exports.toPublicKey)(artist);
    store = (0, exports.toPublicKey)(store);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("collectors_artist_registry"),
        user.toBytes(),
        currency.toBytes(),
        artist.toBytes(),
        store.toBytes(),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
});
exports.collectorArtistRegistryPDA = collectorArtistRegistryPDA;
const collectorGlobalRegistryPDA = ({ user, currency, store }) => {
    user = (0, exports.toPublicKey)(user);
    currency = (0, exports.toPublicKey)(currency);
    store = (0, exports.toPublicKey)(store);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("collectors_global_registry"),
        user.toBytes(),
        currency.toBytes(),
        store.toBytes(),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
};
exports.collectorGlobalRegistryPDA = collectorGlobalRegistryPDA;
const buyPaymentPDA = ({ owner, itemAccount }) => {
    owner = (0, exports.toPublicKey)(owner);
    itemAccount = (0, exports.toPublicKey)(itemAccount);
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from("buy_payment"), owner.toBytes(), itemAccount.toBytes()], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
};
exports.buyPaymentPDA = buyPaymentPDA;
const treeAuthority = ({ tree }) => {
    tree = (0, exports.toPublicKey)(tree);
    return web3_js_1.PublicKey.findProgramAddressSync([tree.toBuffer()], (0, exports.toPublicKey)(programId_1.BUBBLEGUM_PROGRAM_ID));
};
exports.treeAuthority = treeAuthority;
const getATAPDA = (_a) => __awaiter(void 0, [_a], void 0, function* ({ owner, mint }) {
    const [publicKey] = yield web3_js_1.PublicKey.findProgramAddress([
        (0, exports.toPublicKey)(owner).toBuffer(),
        programId_1.TOKEN_PROGRAM_ID.toBuffer(),
        (0, exports.toPublicKey)(mint).toBuffer(),
    ], programId_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
    return publicKey;
});
exports.getATAPDA = getATAPDA;
