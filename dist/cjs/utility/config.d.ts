export declare enum NetworkType {
    DEVNET = "devnet",
    MAINNET = "mainnet-beta"
}
export interface NetworkConfig {
    endpoint: string;
    programId: string;
    tokenProgramId: string;
    metadataProgramId: string;
}
export declare const NETWORK_CONFIGS: Record<NetworkType, NetworkConfig>;
//# sourceMappingURL=config.d.ts.map