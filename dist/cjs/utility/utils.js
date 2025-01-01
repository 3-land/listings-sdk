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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCategory = exports.checkFileType = exports.validateSolAddress = exports.nowS = exports.sleep = exports.cyrb53 = void 0;
exports.bytesToU32 = bytesToU32;
exports.normalizeFileData = normalizeFileData;
exports.getFileType = getFileType;
exports.validateFileType = validateFileType;
exports.getFileCategory = getFileCategory;
exports.isAnimatable = isAnimatable;
const web3_js_1 = require("@solana/web3.js");
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return ((_a = file === null || file === void 0 ? void 0 : file.type) === null || _a === void 0 ? void 0 : _a.includes("video/webp"))
        ? "video/webp"
        : ((_b = file === null || file === void 0 ? void 0 : file.type) === null || _b === void 0 ? void 0 : _b.includes("image/webp"))
            ? "image/webp"
            : ((_c = file === null || file === void 0 ? void 0 : file.type) === null || _c === void 0 ? void 0 : _c.includes("jpeg")) || ((_d = file === null || file === void 0 ? void 0 : file.type) === null || _d === void 0 ? void 0 : _d.includes("jpg"))
                ? "image/jpeg"
                : ((_e = file === null || file === void 0 ? void 0 : file.type) === null || _e === void 0 ? void 0 : _e.includes("gif"))
                    ? "image/gif"
                    : ((_f = file === null || file === void 0 ? void 0 : file.type) === null || _f === void 0 ? void 0 : _f.includes("png"))
                        ? "image/png"
                        : ((_g = file === null || file === void 0 ? void 0 : file.type) === null || _g === void 0 ? void 0 : _g.includes("audio"))
                            ? "audio"
                            : ((_h = file === null || file === void 0 ? void 0 : file.type) === null || _h === void 0 ? void 0 : _h.includes("mp4"))
                                ? "video/mp4"
                                : ((_j = file === null || file === void 0 ? void 0 : file.name) === null || _j === void 0 ? void 0 : _j.includes("glb")) || ((_k = file === null || file === void 0 ? void 0 : file.type) === null || _k === void 0 ? void 0 : _k.includes("model"))
                                    ? "model/gltf-binary"
                                    : null;
};
exports.checkFileType = checkFileType;
const checkCategory = (file) => {
    var _a, _b, _c, _d, _e;
    return ((_a = file === null || file === void 0 ? void 0 : file.type) === null || _a === void 0 ? void 0 : _a.includes("image"))
        ? "image"
        : ((_b = file === null || file === void 0 ? void 0 : file.type) === null || _b === void 0 ? void 0 : _b.includes("audio"))
            ? "audio"
            : ((_c = file === null || file === void 0 ? void 0 : file.type) === null || _c === void 0 ? void 0 : _c.includes("video"))
                ? "video"
                : ((_d = file === null || file === void 0 ? void 0 : file.name) === null || _d === void 0 ? void 0 : _d.includes("glb")) || ((_e = file === null || file === void 0 ? void 0 : file.type) === null || _e === void 0 ? void 0 : _e.includes("model"))
                    ? "vr"
                    : null;
};
exports.checkCategory = checkCategory;
function normalizeFileData(fileData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const buffer = yield (fileData.arrayBuffer instanceof Function
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
    });
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
function getFileType(file) {
    var _a;
    if (!file)
        return null;
    const type = ((_a = file.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
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
    return ((type === null || type === void 0 ? void 0 : type.includes("video/")) ||
        (type === null || type === void 0 ? void 0 : type.includes("audio/")) ||
        type === "model/gltf-binary");
}
