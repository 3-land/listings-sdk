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
exports.uploadFilesIrysInstruction = uploadFilesIrysInstruction;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../../utility/utils");
const node_buffer_1 = require("node:buffer");
function uploadFilesIrysInstruction(options, irysObj, uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const irys = irysObj;
        const signer = yield (irys === null || irys === void 0 ? void 0 : irys.getWallet());
        let main_file = false;
        let cover_file = false;
        try {
            console.log("FILEE: ", options.metadata.files.file.url);
            if (options.metadata.files.file && !options.metadata.files.file.url) {
                const normalizedMainFile = yield (0, utils_1.normalizeFileData)(options.metadata.files.file);
                (0, utils_1.validateFileType)(normalizedMainFile.type);
                main_file = yield (irys === null || irys === void 0 ? void 0 : irys.bundle(normalizedMainFile, false));
            }
            if (options.metadata.files.cover && !options.metadata.files.cover.url) {
                const normalizedCoverFile = yield (0, utils_1.normalizeFileData)(options.metadata.files.cover);
                (0, utils_1.validateFileType)(normalizedCoverFile.type);
                cover_file = yield (irys === null || irys === void 0 ? void 0 : irys.bundle(normalizedCoverFile, false));
            }
            const offchain_metadata = {
                name: options.metadata.name,
                description: options.metadata.description,
                seller_fee_basis_points: options.sellerFeeBasisPoints,
                symbol: options.symbol,
                properties: {
                    files: [
                        main_file && {
                            type: (0, utils_1.getFileType)(main_file),
                            uri: (_a = main_file === null || main_file === void 0 ? void 0 : main_file.irys) === null || _a === void 0 ? void 0 : _a.url,
                        },
                        options.metadata.files.file.url && {
                            uri: options.metadata.files.file.url,
                        },
                        cover_file && {
                            type: (0, utils_1.getFileType)(cover_file),
                            uri: (_b = cover_file === null || cover_file === void 0 ? void 0 : cover_file.irys) === null || _b === void 0 ? void 0 : _b.url,
                        },
                        ((_e = (_d = (_c = options === null || options === void 0 ? void 0 : options.metadata) === null || _c === void 0 ? void 0 : _c.files) === null || _d === void 0 ? void 0 : _d.cover) === null || _e === void 0 ? void 0 : _e.url) && {
                            uri: options.metadata.files.cover.url,
                        },
                    ].filter(Boolean),
                    creators: options.creators,
                },
                image: ((_g = (_f = (main_file || cover_file)) === null || _f === void 0 ? void 0 : _f.irys) === null || _g === void 0 ? void 0 : _g.url) || options.metadata.files.file.url,
                attributes: options.traits,
                category: main_file ? (0, utils_1.getFileCategory)(main_file) : 'image',
                animation_url: (0, utils_1.isAnimatable)(main_file === null || main_file === void 0 ? void 0 : main_file.type)
                    ? (_h = main_file === null || main_file === void 0 ? void 0 : main_file.irys) === null || _h === void 0 ? void 0 : _h.url
                    : undefined,
            };
            console.log('offchain_metadata: ', offchain_metadata);
            const metadata_blob = new node_buffer_1.Blob([JSON.stringify(offchain_metadata)], {
                type: "application/json",
            });
            const metadata_file = {
                data: metadata_blob,
                name: "metadata.json",
                type: "application/json",
                size: metadata_blob.size,
                arrayBuffer: () => metadata_blob.arrayBuffer(),
            };
            const bundled_metadata_file = yield (irys === null || irys === void 0 ? void 0 : irys.bundle(metadata_file, true));
            const irys_url = (_j = bundled_metadata_file === null || bundled_metadata_file === void 0 ? void 0 : bundled_metadata_file.irys) === null || _j === void 0 ? void 0 : _j.url;
            console.log("arweave url: ", irys_url);
            const irys_files = [bundled_metadata_file];
            if (main_file)
                irys_files.push(main_file);
            if (cover_file)
                irys_files.push(cover_file);
            const irys_ix = yield (irys === null || irys === void 0 ? void 0 : irys.getFundingInstructions({
                files: irys_files,
                payer: false,
            }));
            const registeredFiles = yield irys.registerFiles({
                files: irys_files,
                uuid,
            });
            if (!irys_ix) {
                throw new Error("Failed to get funding instructions");
            }
            if (!signer) {
                throw new Error("No signer found in upload files irys instruction");
            }
            return {
                instruction: irys_ix,
                signerIrys: web3_js_1.Keypair.fromSecretKey(signer.secretKey),
                metadataUrl: irys_url,
            };
        }
        catch (error) {
            console.error("Error in uploadFilesIrysInstruction:", error);
            throw new Error(`Failed to process files: ${error}`);
        }
    });
}
