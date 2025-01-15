"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolVaultPDA = exports.getATAPDA = exports.treeAuthority = exports.buyPaymentPDA = exports.collectorGlobalRegistryPDA = exports.collectorArtistRegistryPDA = exports.userActivityPDA = exports.creatorRegistryPDA = exports.poolCreatorRegistryPDA = exports.collectionAuthorityRecord = exports.getEditionPDA = exports.getMetadataPDA = exports.toPublicKey = exports.METADATA_PREFIX = void 0;
exports.holderPDA = holderPDA;
exports.holderAccountPDA = holderAccountPDA;
exports.storePDA = storePDA;
exports.creatorAuthorityPDA = creatorAuthorityPDA;
exports.itemAccountPDA = itemAccountPDA;
exports.itemReserveListPDA = itemReserveListPDA;
const bn_js_1 = __importDefault(require("bn.js"));
const programId_1 = require("../types/programId");
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("./utils");
const bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
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
    if (!storeId?.toNumber)
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
const getMetadataPDA = async (mint) => {
    const [publicKey] = await web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        programId_1.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ], programId_1.TOKEN_METADATA_PROGRAM_ID //PROGRAM_ID
    );
    return publicKey;
};
exports.getMetadataPDA = getMetadataPDA;
const getEditionPDA = async (mint, full) => {
    return await web3_js_1.PublicKey.findProgramAddress([
        Buffer.from(exports.METADATA_PREFIX),
        (0, exports.toPublicKey)(programId_1.TOKEN_METADATA_PROGRAM_ID).toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
    ], (0, exports.toPublicKey)(programId_1.TOKEN_METADATA_PROGRAM_ID));
};
exports.getEditionPDA = getEditionPDA;
const collectionAuthorityRecord = async ({ mint, new_authority, }) => {
    mint = (0, exports.toPublicKey)(mint);
    new_authority = (0, exports.toPublicKey)(new_authority);
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        programId_1.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("collection_authority"),
        new_authority.toBuffer(),
    ], programId_1.TOKEN_METADATA_PROGRAM_ID);
};
exports.collectionAuthorityRecord = collectionAuthorityRecord;
const poolCreatorRegistryPDA = ({ user, currency, store, type, }) => {
    user = (0, exports.toPublicKey)(user);
    currency = (0, exports.toPublicKey)(currency);
    store = (0, exports.toPublicKey)(store);
    const word = [...Buffer.from("creator_registry")];
    if (type?.pool) {
        while (word.length > 23) {
            if (word.length % 2 == 0) {
                word.splice(word.length - 1, 1);
            }
            else {
                word.splice(0, 1);
            }
        }
        word.push(1);
        const pool = (0, exports.toPublicKey)(type.pool).toBytes();
        const pool_hash = new bn_js_1.default((0, utils_1.cyrb53)([...pool], 0)).toArrayLike(Buffer, "le", 8);
        word.push(...pool_hash);
    }
    return web3_js_1.PublicKey.findProgramAddress([
        bytes_1.bs58.decode(bytes_1.bs58.encode(word)),
        currency.toBytes(),
        user.toBytes(),
        store.toBytes(),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
};
exports.poolCreatorRegistryPDA = poolCreatorRegistryPDA;
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
const userActivityPDA = async ({ user, store }) => {
    user = (0, exports.toPublicKey)(user);
    store = (0, exports.toPublicKey)(store);
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from("user_activity_tracking"), user.toBytes(), store.toBytes()], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
};
exports.userActivityPDA = userActivityPDA;
const collectorArtistRegistryPDA = async ({ user, artist, currency, store, }) => {
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
};
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
const getATAPDA = async ({ owner, mint }) => {
    const [publicKey] = await web3_js_1.PublicKey.findProgramAddress([
        (0, exports.toPublicKey)(owner).toBuffer(),
        programId_1.TOKEN_PROGRAM_ID.toBuffer(),
        (0, exports.toPublicKey)(mint).toBuffer(),
    ], programId_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
    return publicKey;
};
exports.getATAPDA = getATAPDA;
const poolVaultPDA = ({ creator, store, currency, type, name }) => {
    store = (0, exports.toPublicKey)(store);
    creator = (0, exports.toPublicKey)(creator);
    currency = (0, exports.toPublicKey)(currency);
    type = type || 1;
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("token_pool"),
        currency.toBytes(),
        store.toBytes(),
        creator.toBytes(),
        [type],
        Buffer.from(name.toLowerCase()),
    ], (0, exports.toPublicKey)(programId_1.PROGRAM_ID));
};
exports.poolVaultPDA = poolVaultPDA;
//# sourceMappingURL=PdaManager.js.map