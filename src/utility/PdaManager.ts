import BN from "bn.js";
import { PROGRAM_ID } from "../types/programId";
import { PublicKey } from "@solana/web3.js";

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
  console.log("-- item reserve: ", item.toString());
  return PublicKey.findProgramAddress(
    [Buffer.from("item_reserve_list"), item.toBytes()],
    toPublicKey(PROGRAM_ID)
  );
}

const toPublicKey = (key: string | PublicKey) => {
  if (typeof key !== "string") return key;
  const PubKeysInternedMap = new Map();
  let result = PubKeysInternedMap.get(key);
  if (!result) {
    result = new PublicKey(key);
    PubKeysInternedMap.set(key, result);
  }
  return result;
};
