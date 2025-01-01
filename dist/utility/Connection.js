import { Connection, Keypair } from "@solana/web3.js";
export function getConnection(endpoint) {
    return new Connection(endpoint);
}
export function createKeypairFromSecretKey(secretKey) {
    return Keypair.fromSecretKey(secretKey);
}
