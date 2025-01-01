"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORK_CONFIGS = exports.NetworkType = void 0;
const programId_1 = require("../types/programId");
var NetworkType;
(function (NetworkType) {
    NetworkType["DEVNET"] = "devnet";
    NetworkType["MAINNET"] = "mainnet-beta";
})(NetworkType || (exports.NetworkType = NetworkType = {}));
exports.NETWORK_CONFIGS = {
    [NetworkType.DEVNET]: {
        endpoint: "https://api.devnet.solana.com",
        programId: programId_1.PROGRAM_CNFT,
        tokenProgramId: programId_1.TOKEN_PROGRAM_ID,
        metadataProgramId: programId_1.TOKEN_METADATA_PROGRAM_ID,
    },
    [NetworkType.MAINNET]: {
        endpoint: "https://api.mainnet-beta.solana.com",
        programId: programId_1.PROGRAM_CNFT,
        tokenProgramId: programId_1.TOKEN_PROGRAM_ID,
        metadataProgramId: programId_1.TOKEN_METADATA_PROGRAM_ID,
    },
};
