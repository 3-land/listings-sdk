import { PublicKey } from "@solana/web3.js";
import { toPublicKey } from "../utility/PdaManager";

// Program ID defined in the provided IDL. Do not edit, it will get overwritten.
export const PROGRAM_ID_IDL = new PublicKey(
  "HgtiJuEcdN6bN6WyYpamL3QKpyMcF8g8FxutDQNB96J9"
);

// This constant will not get overwritten on subsequent code generations and it's safe to modify it's value.
export const PROGRAM_ID: PublicKey = PROGRAM_ID_IDL;

export const BUBBLEGUM_PROGRAM_ID = toPublicKey(
  "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY"
);

export const DEVNET_PROGRAM_ID = toPublicKey(
  "GyPCu89S63P9NcCQAtuSJesiefhhgpGWrNVJs4bF2cSK"
);

export const PROGRAM_CNFT = toPublicKey(
  "HgtiJuEcdN6bN6WyYpamL3QKpyMcF8g8FxutDQNB96J9"
);
export const TOKEN_METADATA_PROGRAM_ID = toPublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
export const TOKEN_PROGRAM_ID = toPublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);
export const SPL_ACCOUNT_COMPRESSION_PROGRAM_ID = toPublicKey(
  "cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK"
);
export const SPL_NOOP_PROGRAM_ID = toPublicKey(
  "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV"
);
export const PROGRAM_CLAIMZ = toPublicKey(
  "52zRX47uXYzpYDmW4PVQTnxjrNhYaCsVEauXm8xF9ARq"
);

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = toPublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);
export const SOLANA_ENDPOINT = "https://api.devnet.solana.com";
