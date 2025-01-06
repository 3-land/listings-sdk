"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFilesIrysInstruction = uploadFilesIrysInstruction;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../../utility/utils");
const node_buffer_1 = require("node:buffer");
async function uploadFilesIrysInstruction(options, irysObj, uuid) {
    const irys = irysObj;
    const signer = await irys?.getWallet();
    let main_file = false;
    let cover_file = false;
    try {
        console.log("FILEE: ", options.metadata.files.file.url);
        if (options.metadata.files.file && !options.metadata.files.file.url) {
            const normalizedMainFile = await (0, utils_1.normalizeFileData)(options.metadata.files.file);
            (0, utils_1.validateFileType)(normalizedMainFile.type);
            main_file = await irys?.bundle(normalizedMainFile, false);
        }
        if (options.metadata.files.cover && !options.metadata.files.cover.url) {
            const normalizedCoverFile = await (0, utils_1.normalizeFileData)(options.metadata.files.cover);
            (0, utils_1.validateFileType)(normalizedCoverFile.type);
            cover_file = await irys?.bundle(normalizedCoverFile, false);
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
                        uri: main_file?.irys?.url,
                    },
                    options.metadata.files.file.url && {
                        type: await (0, utils_1.getUrlFileType)(options.metadata.files.file.url),
                        uri: options.metadata.files.file.url,
                    },
                    cover_file && {
                        type: (0, utils_1.getFileType)(cover_file),
                        uri: cover_file?.irys?.url,
                    },
                    options?.metadata?.files?.cover?.url && {
                        type: await (0, utils_1.getUrlFileType)(options.metadata.files.cover.url),
                        uri: options.metadata.files.cover.url,
                    },
                ].filter(Boolean),
                creators: options.creators,
            },
            image: (main_file || cover_file)?.irys?.url || options.metadata.files.file.url,
            attributes: options.traits,
            category: main_file ? (0, utils_1.getFileCategory)(main_file) : "image",
            animation_url: (0, utils_1.isAnimatable)(main_file?.type)
                ? main_file?.irys?.url
                : undefined,
        };
        console.log("offchain_metadata: ", offchain_metadata);
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
        const bundled_metadata_file = await irys?.bundle(metadata_file, true);
        const irys_url = bundled_metadata_file?.irys?.url;
        console.log("arweave url: ", irys_url);
        const irys_files = [bundled_metadata_file];
        if (main_file)
            irys_files.push(main_file);
        if (cover_file)
            irys_files.push(cover_file);
        const irys_ix = await irys?.getFundingInstructions({
            files: irys_files,
            payer: false,
        });
        const registeredFiles = await irys.registerFiles({
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
}
//# sourceMappingURL=uploadFilesIryis.js.map