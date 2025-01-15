import { PublicKey } from "@solana/web3.js";
import { FileData } from "../library/instructions/store/uploadFilesIryis";
import fetch from "node-fetch";
import BN from "bn.js";
import { toPublicKey } from "./PdaManager";
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";

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
  return file?.type?.includes("video/webp")
    ? "video/webp"
    : file?.type?.includes("image/webp")
    ? "image/webp"
    : file?.type?.includes("jpeg") || file?.type?.includes("jpg")
    ? "image/jpeg"
    : file?.type?.includes("gif")
    ? "image/gif"
    : file?.type?.includes("png")
    ? "image/png"
    : file?.type?.includes("audio")
    ? "audio"
    : file?.type?.includes("mp4")
    ? "video/mp4"
    : file?.name?.includes("glb") || file?.type?.includes("model")
    ? "model/gltf-binary"
    : null;
};

export const checkCategory = (file: any) => {
  return file?.type?.includes("image")
    ? "image"
    : file?.type?.includes("audio")
    ? "audio"
    : file?.type?.includes("video")
    ? "video"
    : file?.name?.includes("glb") || file?.type?.includes("model")
    ? "vr"
    : null;
};

export async function normalizeFileData(fileData: any): Promise<FileData> {
  try {
    const buffer = await (fileData.arrayBuffer instanceof Function
      ? fileData.arrayBuffer()
      : Promise.resolve(fileData.arrayBuffer));

    const type = fileData.type || getMimeTypeFromBuffer(buffer);

    return {
      arrayBuffer: () => buffer,
      type,
      size: buffer.byteLength,
      name: fileData.name,
    };
  } catch (error) {
    throw new Error(`Failed to normalize file data: ${error}`);
  }
}

function getMimeTypeFromBuffer(buffer: ArrayBuffer): string {
  const arr = new Uint8Array(buffer).subarray(0, 12);
  const header = Array.from(arr)
    .map((byte) => byte.toString(16))
    .join("");

  if (header.startsWith("89504e47")) return "image/png";
  if (header.startsWith("474946")) return "image/gif";
  if (header.startsWith("ffd8ff")) return "image/jpeg";
  if (header.startsWith("52494646") && header.includes("57454250"))
    return "image/webp";
  if (header.startsWith("494433") || header.startsWith("fffb"))
    return "audio/mp3";
  if (
    header.startsWith("000000") &&
    (header.includes("66747970") || header.includes("6d6f6f76"))
  )
    return "video/mp4";
  if (header.startsWith("676c5446")) return "model/gltf-binary";

  return "application/octet-stream";
}

export async function getUrlFileType(fileUrl: string): Promise<string> {
  try {
    // Fetch only the first 12 bytes of the file first to check if the file exists
    const headResponse = await fetch(fileUrl, { method: "HEAD" });
    if (!headResponse.ok) {
      throw new Error(`Failed to fetch file: ${headResponse.statusText}`);
    }

    // Then fetch the beginning of the file using a range request
    const response = await fetch(fileUrl, {
      headers: {
        Range: "bytes=0-11",
      },
    });

    if (!response.ok) {
      // If range request is not supported, fetch a small part of the file
      const fullResponse = await fetch(fileUrl);
      if (!fullResponse.ok) {
        throw new Error(`Failed to fetch file: ${fullResponse.statusText}`);
      }
      const buffer = await fullResponse.arrayBuffer();
      // Only take the first 12 bytes
      const slicedBuffer = buffer.slice(0, 12);
      return getMimeTypeFromBuffer(slicedBuffer);
    }

    const buffer = await response.arrayBuffer();
    const fileType = getMimeTypeFromBuffer(buffer);
    console.log("file type in getUrl: ", fileType);
    return fileType;
  } catch (error) {
    console.error("Error getting file type from URL:", error);
    return "application/octet-stream"; // Default type if we can't determine the actual type
  }
}

export function getFileType(file: any): string | null {
  if (!file) return null;

  const type = file.type?.toLowerCase() || "";
  const name = (file.name || "").toLowerCase();

  if (type.includes("video/webp")) return "video/webp";
  if (type.includes("image/webp")) return "image/webp";
  if (type.includes("jpeg") || type.includes("jpg")) return "image/jpeg";
  if (type.includes("gif")) return "image/gif";
  if (type.includes("png")) return "image/png";
  if (type.includes("mp3") || type.includes("audio/mp3")) return "audio/mp3";
  if (type.includes("mp4")) return "video/mp4";
  if (type.includes("glb") || name.endsWith(".glb")) return "model/gltf-binary";

  return type || null;
}

export function validateFileType(type: string): void {
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "video/mp4",
    "audio/mp3",
    "model/gltf-binary",
    "application/octet-stream",
  ];

  if (!allowedTypes.includes(type)) {
    throw new Error(`Unsupported file type: ${type}`);
  }
}

export function getFileCategory(file: any): string | null {
  if (!file) return null;

  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();

  if (type.includes("image")) return "image";
  if (type.includes("audio")) return "audio";
  if (type.includes("video")) return "video";
  if (type.includes("model") || name.endsWith(".glb")) return "vr";

  return null;
}

export function isAnimatable(type: string): boolean {
  return (
    type?.includes("video/") ||
    type?.includes("audio/") ||
    type === "model/gltf-binary"
  );
}

export const buildTree = (prev_layer: any, layers: any): any => {
  if (prev_layer.length === 1) {
    return prev_layer;
  }
  const next_layer = [];
  for (let i = 0; i < prev_layer.length; i += 2) {
    const a = prev_layer[i];
    const b = prev_layer[i + 1] || 0;
    const aN = new BN(a).toArrayLike(Buffer, "le", 8);
    const bN = new BN(b).toArrayLike(Buffer, "le", 8);
    next_layer.push(cyrb53([...aN, ...bN], 0));
  }
  if (next_layer.length % 2 == 1) layers.unshift(next_layer);
  if (layers.length > 100) return layers;
  return buildTree(next_layer, layers);
};

export const mapTraits = (attributes: any, anchor: any): any => {
  const hashes = [];
  if (!attributes.length) return [[0]];
  for (const attr of attributes) {
    if (attr.offchain) continue;
    const typeBytes = new BN(cyrb53(attr.trait_type + "", 0)).toArrayLike(
      Buffer,
      "le",
      8
    );
    const valueBytes = new BN(cyrb53(attr.value + "", 0)).toArrayLike(
      Buffer,
      "le",
      8
    );
    hashes.push(cyrb53([...typeBytes, ...valueBytes], 0));
  }
  const layers = [hashes];

  buildTree(layers[0], layers);

  return layers;
};

export const findAssociatedTokenAccountAddress2 = async (
  mint: string,
  wallet: string
) => {
  return PublicKey.findProgramAddress(
    [
      toPublicKey(wallet).toBuffer(),
      toPublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").toBuffer(),
      toPublicKey(mint).toBuffer(),
    ],
    toPublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
  );
};

export const createATA = async ({ owner, payer, nft }: any) => {
  owner = toPublicKey(owner);
  nft = toPublicKey(nft);
  payer = toPublicKey(payer || owner);

  const [destination] = await findAssociatedTokenAccountAddress2(nft, owner);

  // const instructions = [];

  // instructions.push(

  // );

  console.log("data ata: ", payer, destination, owner, nft);
  console.log('create ass tok: ', createAssociatedTokenAccountInstruction)

  const ix = createAssociatedTokenAccountInstruction(
    payer, //payer
    destination,
    owner, //walletAddress
    nft //mintAddress
  );

  // return { instructions };
  return ix;
};
