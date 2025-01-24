import {
  PROGRAM_CNFT,
  TOKEN_METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "../types/programId";

export enum NetworkType {
  DEVNET = "devnet",
  MAINNET = "mainnet-beta",
}

export interface NetworkConfig {
  endpoint: string;
  programId: string;
  tokenProgramId: string;
  metadataProgramId: string;
}

export const NETWORK_CONFIGS: Record<NetworkType, NetworkConfig> = {
  [NetworkType.DEVNET]: {
    endpoint: "https://api.devnet.solana.com",
    programId: PROGRAM_CNFT,
    tokenProgramId: TOKEN_PROGRAM_ID,
    metadataProgramId: TOKEN_METADATA_PROGRAM_ID,
  },
  [NetworkType.MAINNET]: {
    endpoint:
      "https://mainnet.helius-rpc.com/?api-key=e9d77cc5-726b-4673-8bd3-801defd60757", //"https://api.mainnet-beta.solana.com",
    programId: PROGRAM_CNFT,
    tokenProgramId: TOKEN_PROGRAM_ID,
    metadataProgramId: TOKEN_METADATA_PROGRAM_ID,
  },
};
