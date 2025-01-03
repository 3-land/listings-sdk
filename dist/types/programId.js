"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOLANA_ENDPOINT = exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = exports.PROGRAM_CLAIMZ = exports.SPL_NOOP_PROGRAM_ID = exports.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID = exports.TOKEN_PROGRAM_ID = exports.TOKEN_METADATA_PROGRAM_ID = exports.PROGRAM_CNFT = exports.DEVNET_PROGRAM_ID = exports.BUBBLEGUM_PROGRAM_ID = exports.PROGRAM_ID = exports.PROGRAM_ID_IDL = void 0;
const web3_js_1 = require("@solana/web3.js");
const PdaManager_1 = require("../utility/PdaManager");
// Program ID defined in the provided IDL. Do not edit, it will get overwritten.
exports.PROGRAM_ID_IDL = new web3_js_1.PublicKey("HgtiJuEcdN6bN6WyYpamL3QKpyMcF8g8FxutDQNB96J9");
// This constant will not get overwritten on subsequent code generations and it's safe to modify it's value.
exports.PROGRAM_ID = exports.PROGRAM_ID_IDL;
exports.BUBBLEGUM_PROGRAM_ID = (0, PdaManager_1.toPublicKey)("BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY");
exports.DEVNET_PROGRAM_ID = (0, PdaManager_1.toPublicKey)("GyPCu89S63P9NcCQAtuSJesiefhhgpGWrNVJs4bF2cSK");
exports.PROGRAM_CNFT = (0, PdaManager_1.toPublicKey)("HgtiJuEcdN6bN6WyYpamL3QKpyMcF8g8FxutDQNB96J9");
exports.TOKEN_METADATA_PROGRAM_ID = (0, PdaManager_1.toPublicKey)("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
exports.TOKEN_PROGRAM_ID = (0, PdaManager_1.toPublicKey)("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
exports.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID = (0, PdaManager_1.toPublicKey)("cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK");
exports.SPL_NOOP_PROGRAM_ID = (0, PdaManager_1.toPublicKey)("noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV");
exports.PROGRAM_CLAIMZ = (0, PdaManager_1.toPublicKey)("52zRX47uXYzpYDmW4PVQTnxjrNhYaCsVEauXm8xF9ARq");
exports.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = (0, PdaManager_1.toPublicKey)("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
exports.SOLANA_ENDPOINT = "https://api.devnet.solana.com";
//# sourceMappingURL=programId.js.map