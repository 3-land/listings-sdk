import { PROGRAM_CNFT, TOKEN_METADATA_PROGRAM_ID, TOKEN_PROGRAM_ID, } from "../types/programId";
export var NetworkType;
(function (NetworkType) {
    NetworkType["DEVNET"] = "devnet";
    NetworkType["MAINNET"] = "mainnet-beta";
})(NetworkType || (NetworkType = {}));
export const NETWORK_CONFIGS = {
    [NetworkType.DEVNET]: {
        endpoint: "https://api.devnet.solana.com",
        programId: PROGRAM_CNFT,
        tokenProgramId: TOKEN_PROGRAM_ID,
        metadataProgramId: TOKEN_METADATA_PROGRAM_ID,
    },
    [NetworkType.MAINNET]: {
        endpoint: "https://api.mainnet-beta.solana.com",
        programId: PROGRAM_CNFT,
        tokenProgramId: TOKEN_PROGRAM_ID,
        metadataProgramId: TOKEN_METADATA_PROGRAM_ID,
    },
};
