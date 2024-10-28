import { PublicKey } from "@solana/web3.js";

export function bytesToU32(slice: any) {
  let result = 0;
  for (let i = slice.length - 1; i >= 0; i--) {
    result = (result << 8) | slice[i];
  }
  return result >>> 0;
}

export const cyrb53 = (str: any, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;

  let arr = null;
  if (typeof str != "string") {
    if (Array.isArray(str)) {
      arr = str;
    } else {
      str = str + "";
    }
  }
  if (arr) {
    for (const ch of arr) {
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
  } else {
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const sleep = (t: any) => {
  return new Promise((res) => {
    setTimeout(res, t);
  });
};

export const nowS = () => Date.now() / 1000;

export const validateSolAddress = (address: any) => {
  try {
    let pubkey = new PublicKey(address);
    return PublicKey.isOnCurve(pubkey.toBuffer());
  } catch (error) {
    return false;
  }
};

export const checkFileType = (file: any) => {
  return file?.type?.includes("image")
    ? "image"
    : file?.type?.includes("audio")
    ? "audio"
    : file?.type?.includes("video")
    ? "video"
    : file?.name?.includes(".glb") || file?.type?.includes("model")
    ? "vr"
    : null;
};
