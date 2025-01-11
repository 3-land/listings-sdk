import BN from "bn.js";
import {
  BUBBLEGUM_PROGRAM_ID,
  PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "../types/programId";
import { PublicKey } from "@solana/web3.js";
import { cyrb53 } from "./utils";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

export const METADATA_PREFIX = "metadata";

export function holderPDA({ creator, slot }: any) {
  if (!slot) slot = 0;
  creator = toPublicKey(creator);
  return PublicKey.findProgramAddress(
    [
      Buffer.from("holder"),
      creator.toBytes(),
      new BN(slot).toArrayLike(Buffer, "le", 8),
    ],
    toPublicKey(PROGRAM_ID)
  );
}

export function holderAccountPDA({ creator, slot }: any) {
  if (!slot) slot = 0;
  creator = toPublicKey(creator);
  return PublicKey.findProgramAddress(
    [
      Buffer.from("holder_account"),
      creator.toBytes(),
      new BN(slot).toArrayLike(Buffer, "le", 8),
    ],
    toPublicKey(PROGRAM_ID)
  );
}

export function storePDA({ storeId, creator, holder }: any) {
  holder = toPublicKey(holder);
  creator = toPublicKey(creator);
  if (!storeId?.toNumber) storeId = new BN(storeId);
  return PublicKey.findProgramAddress(
    [
      Buffer.from("store"),
      holder.toBytes(),
      creator.toBytes(),
      storeId.toArrayLike(Buffer, "le", 2),
    ],
    toPublicKey(PROGRAM_ID)
  );
}

export function creatorAuthorityPDA({ creator, store }: any) {
  store = toPublicKey(store);
  creator = toPublicKey(creator);
  return PublicKey.findProgramAddress(
    [Buffer.from("creator_authority"), store.toBytes(), creator.toBytes()],
    toPublicKey(PROGRAM_ID)
  );
}

export function itemAccountPDA({ creator, store, identifier }: any) {
  store = toPublicKey(store);
  creator = toPublicKey(creator);

  return PublicKey.findProgramAddress(
    [
      Buffer.from("item_account"),
      store.toBytes(),
      creator.toBytes(),
      identifier.toArrayLike(Buffer, "le", 8),
    ],
    toPublicKey(PROGRAM_ID)
  );
}

export function itemReserveListPDA({ item }: any) {
  item = toPublicKey(item);
  return PublicKey.findProgramAddress(
    [Buffer.from("item_reserve_list"), item.toBytes()],
    toPublicKey(PROGRAM_ID)
  );
}

export const toPublicKey = (key: string | PublicKey | boolean) => {
  if (typeof key !== "string") return key;
  const PubKeysInternedMap = new Map();
  let result = PubKeysInternedMap.get(key);
  if (!result) {
    result = new PublicKey(key);
    PubKeysInternedMap.set(key, result);
  }
  return result;
};

export const getMetadataPDA = async (mint: any) => {
  const [publicKey] = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID //PROGRAM_ID
  );
  return publicKey;
};

export const getEditionPDA = async (mint: any, full: any) => {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from(METADATA_PREFIX),
      toPublicKey(TOKEN_METADATA_PROGRAM_ID).toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    toPublicKey(TOKEN_METADATA_PROGRAM_ID)
  );
};

export const collectionAuthorityRecord = async ({
  mint,
  new_authority,
}: any) => {
  mint = toPublicKey(mint);
  new_authority = toPublicKey(new_authority);
  return PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("collection_authority"),
      new_authority.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
};

export const poolCreatorRegistryPDA = ({
  user,
  currency,
  store,
  type,
}: any) => {
  user = toPublicKey(user);
  currency = toPublicKey(currency);
  store = toPublicKey(store);

  const word = [...Buffer.from("creator_registry")];

  if (type?.pool) {
    while (word.length > 23) {
      if (word.length % 2 == 0) {
        word.splice(word.length - 1, 1);
      } else {
        word.splice(0, 1);
      }
    }
    word.push(1);
    const pool = toPublicKey(type.pool).toBytes();
    const pool_hash = new BN(cyrb53([...pool], 0)).toArrayLike(Buffer, "le", 8);
    word.push(...pool_hash);
  }

  return PublicKey.findProgramAddress(
    [
      bs58.decode(bs58.encode(word)),
      currency.toBytes(),
      user.toBytes(),
      store.toBytes(),
    ],
    toPublicKey(PROGRAM_ID)
  );
};

export const creatorRegistryPDA = ({ user, currency, store }: any) => {
  user = toPublicKey(user);
  currency = toPublicKey(currency);
  store = toPublicKey(store);

  return PublicKey.findProgramAddress(
    [
      Buffer.from("creator_registry"),
      currency.toBytes(),
      user.toBytes(),
      store.toBytes(),
    ],
    toPublicKey(PROGRAM_ID)
  );
};

export const userActivityPDA = async ({ user, store }: any) => {
  user = toPublicKey(user);

  store = toPublicKey(store);
  return PublicKey.findProgramAddress(
    [Buffer.from("user_activity_tracking"), user.toBytes(), store.toBytes()],
    toPublicKey(PROGRAM_ID)
  );
};

export const collectorArtistRegistryPDA = async ({
  user,
  artist,
  currency,
  store,
}: any) => {
  user = toPublicKey(user);
  currency = toPublicKey(currency);
  artist = toPublicKey(artist);
  store = toPublicKey(store);
  return PublicKey.findProgramAddress(
    [
      Buffer.from("collectors_artist_registry"),
      user.toBytes(),
      currency.toBytes(),
      artist.toBytes(),
      store.toBytes(),
    ],
    toPublicKey(PROGRAM_ID)
  );
};

export const collectorGlobalRegistryPDA = ({ user, currency, store }: any) => {
  user = toPublicKey(user);
  currency = toPublicKey(currency);
  store = toPublicKey(store);
  return PublicKey.findProgramAddress(
    [
      Buffer.from("collectors_global_registry"),
      user.toBytes(),
      currency.toBytes(),
      store.toBytes(),
    ],
    toPublicKey(PROGRAM_ID)
  );
};

export const buyPaymentPDA = ({ owner, itemAccount }: any) => {
  owner = toPublicKey(owner);
  itemAccount = toPublicKey(itemAccount);
  return PublicKey.findProgramAddress(
    [Buffer.from("buy_payment"), owner.toBytes(), itemAccount.toBytes()],
    toPublicKey(PROGRAM_ID)
  );
};

export const treeAuthority = ({ tree }: any) => {
  tree = toPublicKey(tree);

  return PublicKey.findProgramAddressSync(
    [tree.toBuffer()],
    toPublicKey(BUBBLEGUM_PROGRAM_ID)
  );
};

export const getATAPDA = async ({ owner, mint }: any) => {
  const [publicKey] = await PublicKey.findProgramAddress(
    [
      toPublicKey(owner).toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      toPublicKey(mint).toBuffer(),
    ],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  );
  return publicKey;
};

export const poolVaultPDA = ({ creator, store, currency, type, name }: any) => {
  store = toPublicKey(store);
  creator = toPublicKey(creator);
  currency = toPublicKey(currency);
  type = type || 1;
  return PublicKey.findProgramAddress(
    [
      Buffer.from("token_pool"),
      currency.toBytes(),
      store.toBytes(),
      creator.toBytes(),
      [type],
      Buffer.from(name.toLowerCase()),
    ],
    toPublicKey(PROGRAM_ID)
  );
};
