"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createATA = exports.findAssociatedTokenAccountAddress2 = exports.mapTraits = exports.buildTree = exports.checkCategory = exports.checkFileType = exports.validateSolAddress = exports.nowS = exports.sleep = exports.cyrb53 = void 0;
exports.bytesToU32 = bytesToU32;
exports.normalizeFileData = normalizeFileData;
exports.getUrlFileType = getUrlFileType;
exports.getFileType = getFileType;
exports.validateFileType = validateFileType;
exports.getFileCategory = getFileCategory;
exports.isAnimatable = isAnimatable;
const web3_js_1 = require("@solana/web3.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const bn_js_1 = __importDefault(require("bn.js"));
const PdaManager_1 = require("./PdaManager");
const spl_token_1 = require("@solana/spl-token");
function bytesToU32(slice) {
    let result = 0;
    for (let i = slice.length - 1; i >= 0; i--) {
        result = (result << 8) | slice[i];
    }
    return result >>> 0;
}
const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    let arr = null;
    if (typeof str != "string") {
        if (Array.isArray(str)) {
            arr = str;
        }
        else {
            str = str + "";
        }
    }
    if (arr) {
        for (const ch of arr) {
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
    }
    else {
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
exports.cyrb53 = cyrb53;
const sleep = (t) => {
    return new Promise((res) => {
        setTimeout(res, t);
    });
};
exports.sleep = sleep;
const nowS = () => Date.now() / 1000;
exports.nowS = nowS;
const validateSolAddress = (address) => {
    try {
        let pubkey = new web3_js_1.PublicKey(address);
        return web3_js_1.PublicKey.isOnCurve(pubkey.toBuffer());
    }
    catch (error) {
        return false;
    }
};
exports.validateSolAddress = validateSolAddress;
const checkFileType = (file) => {
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
exports.checkFileType = checkFileType;
const checkCategory = (file) => {
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
exports.checkCategory = checkCategory;
async function normalizeFileData(fileData) {
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
    }
    catch (error) {
        throw new Error(`Failed to normalize file data: ${error}`);
    }
}
function getMimeTypeFromBuffer(buffer) {
    const arr = new Uint8Array(buffer).subarray(0, 12);
    const header = Array.from(arr)
        .map((byte) => byte.toString(16))
        .join("");
    if (header.startsWith("89504e47"))
        return "image/png";
    if (header.startsWith("474946"))
        return "image/gif";
    if (header.startsWith("ffd8ff"))
        return "image/jpeg";
    if (header.startsWith("52494646") && header.includes("57454250"))
        return "image/webp";
    if (header.startsWith("494433") || header.startsWith("fffb"))
        return "audio/mp3";
    if (header.startsWith("000000") &&
        (header.includes("66747970") || header.includes("6d6f6f76")))
        return "video/mp4";
    if (header.startsWith("676c5446"))
        return "model/gltf-binary";
    return "application/octet-stream";
}
async function getUrlFileType(fileUrl) {
    try {
        // Fetch only the first 12 bytes of the file first to check if the file exists
        const headResponse = await (0, node_fetch_1.default)(fileUrl, { method: "HEAD" });
        if (!headResponse.ok) {
            throw new Error(`Failed to fetch file: ${headResponse.statusText}`);
        }
        // Then fetch the beginning of the file using a range request
        const response = await (0, node_fetch_1.default)(fileUrl, {
            headers: {
                Range: "bytes=0-11",
            },
        });
        if (!response.ok) {
            // If range request is not supported, fetch a small part of the file
            const fullResponse = await (0, node_fetch_1.default)(fileUrl);
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
    }
    catch (error) {
        console.error("Error getting file type from URL:", error);
        return "application/octet-stream"; // Default type if we can't determine the actual type
    }
}
function getFileType(file) {
    if (!file)
        return null;
    const type = file.type?.toLowerCase() || "";
    const name = (file.name || "").toLowerCase();
    if (type.includes("video/webp"))
        return "video/webp";
    if (type.includes("image/webp"))
        return "image/webp";
    if (type.includes("jpeg") || type.includes("jpg"))
        return "image/jpeg";
    if (type.includes("gif"))
        return "image/gif";
    if (type.includes("png"))
        return "image/png";
    if (type.includes("mp3") || type.includes("audio/mp3"))
        return "audio/mp3";
    if (type.includes("mp4"))
        return "video/mp4";
    if (type.includes("glb") || name.endsWith(".glb"))
        return "model/gltf-binary";
    return type || null;
}
function validateFileType(type) {
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
function getFileCategory(file) {
    if (!file)
        return null;
    const type = (file.type || "").toLowerCase();
    const name = (file.name || "").toLowerCase();
    if (type.includes("image"))
        return "image";
    if (type.includes("audio"))
        return "audio";
    if (type.includes("video"))
        return "video";
    if (type.includes("model") || name.endsWith(".glb"))
        return "vr";
    return null;
}
function isAnimatable(type) {
    return (type?.includes("video/") ||
        type?.includes("audio/") ||
        type === "model/gltf-binary");
}
const buildTree = (prev_layer, layers) => {
    if (prev_layer.length === 1) {
        return prev_layer;
    }
    const next_layer = [];
    for (let i = 0; i < prev_layer.length; i += 2) {
        const a = prev_layer[i];
        const b = prev_layer[i + 1] || 0;
        const aN = new bn_js_1.default(a).toArrayLike(Buffer, "le", 8);
        const bN = new bn_js_1.default(b).toArrayLike(Buffer, "le", 8);
        next_layer.push((0, exports.cyrb53)([...aN, ...bN], 0));
    }
    if (next_layer.length % 2 == 1)
        layers.unshift(next_layer);
    if (layers.length > 100)
        return layers;
    return (0, exports.buildTree)(next_layer, layers);
};
exports.buildTree = buildTree;
const mapTraits = (attributes, anchor) => {
    const hashes = [];
    if (!attributes.length)
        return [[0]];
    for (const attr of attributes) {
        if (attr.offchain)
            continue;
        const typeBytes = new bn_js_1.default((0, exports.cyrb53)(attr.trait_type + "", 0)).toArrayLike(Buffer, "le", 8);
        const valueBytes = new bn_js_1.default((0, exports.cyrb53)(attr.value + "", 0)).toArrayLike(Buffer, "le", 8);
        hashes.push((0, exports.cyrb53)([...typeBytes, ...valueBytes], 0));
    }
    const layers = [hashes];
    (0, exports.buildTree)(layers[0], layers);
    return layers;
};
exports.mapTraits = mapTraits;
const findAssociatedTokenAccountAddress2 = async (mint, wallet) => {
    return web3_js_1.PublicKey.findProgramAddress([
        (0, PdaManager_1.toPublicKey)(wallet).toBuffer(),
        (0, PdaManager_1.toPublicKey)("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").toBuffer(),
        (0, PdaManager_1.toPublicKey)(mint).toBuffer(),
    ], (0, PdaManager_1.toPublicKey)("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"));
};
exports.findAssociatedTokenAccountAddress2 = findAssociatedTokenAccountAddress2;
const createATA = async ({ owner, payer, nft }) => {
    owner = (0, PdaManager_1.toPublicKey)(owner);
    nft = (0, PdaManager_1.toPublicKey)(nft);
    payer = (0, PdaManager_1.toPublicKey)(payer || owner);
    const [destination] = await (0, exports.findAssociatedTokenAccountAddress2)(nft, owner);
    // const instructions = [];
    // instructions.push(
    // );
    console.log("data ata: ", payer, destination, owner, nft);
    console.log('create ass tok: ', spl_token_1.createAssociatedTokenAccountInstruction);
    const ix = (0, spl_token_1.createAssociatedTokenAccountInstruction)(payer, //payer
    destination, owner, //walletAddress
    nft //mintAddress
    );
    // return { instructions };
    return ix;
};
exports.createATA = createATA;
//# sourceMappingURL=utils.js.map