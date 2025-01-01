var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BN from "bn.js";
import { BUBBLEGUM_PROGRAM_ID, PROGRAM_ID, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, TOKEN_METADATA_PROGRAM_ID, TOKEN_PROGRAM_ID, } from "../types/programId";
import { PublicKey } from "@solana/web3.js";
export const METADATA_PREFIX = "metadata";
export function holderPDA({ creator, slot }) {
    if (!slot)
        slot = 0;
    creator = toPublicKey(creator);
    return PublicKey.findProgramAddress([
        Buffer.from("holder"),
        creator.toBytes(),
        new BN(slot).toArrayLike(Buffer, "le", 8),
    ], toPublicKey(PROGRAM_ID));
}
export function holderAccountPDA({ creator, slot }) {
    if (!slot)
        slot = 0;
    creator = toPublicKey(creator);
    return PublicKey.findProgramAddress([
        Buffer.from("holder_account"),
        creator.toBytes(),
        new BN(slot).toArrayLike(Buffer, "le", 8),
    ], toPublicKey(PROGRAM_ID));
}
export function storePDA({ storeId, creator, holder }) {
    holder = toPublicKey(holder);
    creator = toPublicKey(creator);
    if (!(storeId === null || storeId === void 0 ? void 0 : storeId.toNumber))
        storeId = new BN(storeId);
    return PublicKey.findProgramAddress([
        Buffer.from("store"),
        holder.toBytes(),
        creator.toBytes(),
        storeId.toArrayLike(Buffer, "le", 2),
    ], toPublicKey(PROGRAM_ID));
}
export function creatorAuthorityPDA({ creator, store }) {
    store = toPublicKey(store);
    creator = toPublicKey(creator);
    return PublicKey.findProgramAddress([Buffer.from("creator_authority"), store.toBytes(), creator.toBytes()], toPublicKey(PROGRAM_ID));
}
export function itemAccountPDA({ creator, store, identifier }) {
    store = toPublicKey(store);
    creator = toPublicKey(creator);
    return PublicKey.findProgramAddress([
        Buffer.from("item_account"),
        store.toBytes(),
        creator.toBytes(),
        identifier.toArrayLike(Buffer, "le", 8),
    ], toPublicKey(PROGRAM_ID));
}
export function itemReserveListPDA({ item }) {
    item = toPublicKey(item);
    return PublicKey.findProgramAddress([Buffer.from("item_reserve_list"), item.toBytes()], toPublicKey(PROGRAM_ID));
}
export const toPublicKey = (key) => {
    if (typeof key !== "string")
        return key;
    const PubKeysInternedMap = new Map();
    let result = PubKeysInternedMap.get(key);
    if (!result) {
        result = new PublicKey(key);
        PubKeysInternedMap.set(key, result);
    }
    return result;
};
export const getMetadataPDA = (mint) => __awaiter(void 0, void 0, void 0, function* () {
    const [publicKey] = yield PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ], TOKEN_METADATA_PROGRAM_ID //PROGRAM_ID
    );
    return publicKey;
});
export const getEditionPDA = (mint, full) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PublicKey.findProgramAddress([
        Buffer.from(METADATA_PREFIX),
        toPublicKey(TOKEN_METADATA_PROGRAM_ID).toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
    ], toPublicKey(TOKEN_METADATA_PROGRAM_ID));
});
export const collectionAuthorityRecord = (_a) => __awaiter(void 0, [_a], void 0, function* ({ mint, new_authority, }) {
    mint = toPublicKey(mint);
    new_authority = toPublicKey(new_authority);
    return PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("collection_authority"),
        new_authority.toBuffer(),
    ], TOKEN_METADATA_PROGRAM_ID);
});
export const creatorRegistryPDA = ({ user, currency, store }) => {
    user = toPublicKey(user);
    currency = toPublicKey(currency);
    store = toPublicKey(store);
    return PublicKey.findProgramAddress([
        Buffer.from("creator_registry"),
        currency.toBytes(),
        user.toBytes(),
        store.toBytes(),
    ], toPublicKey(PROGRAM_ID));
};
export const userActivityPDA = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, store }) {
    user = toPublicKey(user);
    store = toPublicKey(store);
    return PublicKey.findProgramAddress([Buffer.from("user_activity_tracking"), user.toBytes(), store.toBytes()], toPublicKey(PROGRAM_ID));
});
export const collectorArtistRegistryPDA = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, artist, currency, store, }) {
    user = toPublicKey(user);
    currency = toPublicKey(currency);
    artist = toPublicKey(artist);
    store = toPublicKey(store);
    return PublicKey.findProgramAddress([
        Buffer.from("collectors_artist_registry"),
        user.toBytes(),
        currency.toBytes(),
        artist.toBytes(),
        store.toBytes(),
    ], toPublicKey(PROGRAM_ID));
});
export const collectorGlobalRegistryPDA = ({ user, currency, store }) => {
    user = toPublicKey(user);
    currency = toPublicKey(currency);
    store = toPublicKey(store);
    return PublicKey.findProgramAddress([
        Buffer.from("collectors_global_registry"),
        user.toBytes(),
        currency.toBytes(),
        store.toBytes(),
    ], toPublicKey(PROGRAM_ID));
};
export const buyPaymentPDA = ({ owner, itemAccount }) => {
    owner = toPublicKey(owner);
    itemAccount = toPublicKey(itemAccount);
    return PublicKey.findProgramAddress([Buffer.from("buy_payment"), owner.toBytes(), itemAccount.toBytes()], toPublicKey(PROGRAM_ID));
};
export const treeAuthority = ({ tree }) => {
    tree = toPublicKey(tree);
    return PublicKey.findProgramAddressSync([tree.toBuffer()], toPublicKey(BUBBLEGUM_PROGRAM_ID));
};
export const getATAPDA = (_a) => __awaiter(void 0, [_a], void 0, function* ({ owner, mint }) {
    const [publicKey] = yield PublicKey.findProgramAddress([
        toPublicKey(owner).toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        toPublicKey(mint).toBuffer(),
    ], SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
    return publicKey;
});
