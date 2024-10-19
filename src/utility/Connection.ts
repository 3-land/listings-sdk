import { Connection, Keypair, PublicKey } from "@solana/web3.js";

export function getConnection(endpoint: string): Connection {
  return new Connection(endpoint);
}

export function createKeypairFromSecretKey(secretKey: Uint8Array): Keypair {
  return Keypair.fromSecretKey(secretKey);
}
