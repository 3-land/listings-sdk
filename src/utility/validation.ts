import { PublicKey, Signer } from "@solana/web3.js";
import { StoreConfig, SaleConfig, ShortMetadataArgs } from "../types/types";
import { BN } from "bn.js";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateStoreConfig(config: StoreConfig) {
  if (!config.fee || !(config.fee instanceof BN)) {
    throw new ValidationError("Store fee must be a valid BN instance");
  }

  if (
    typeof config.feePercentage !== "number" ||
    config.feePercentage < 0 ||
    config.feePercentage > 100
  ) {
    throw new ValidationError(
      "Fee percentage must be a number between 0 and 100"
    );
  }

  if (!config.trust || !(config.trust instanceof PublicKey)) {
    throw new ValidationError("Trust must be a valid PublicKey");
  }
}

export function validateMetadata(metadata: ShortMetadataArgs) {
  if (!metadata.name || metadata.name.length > 32) {
    throw new ValidationError(
      "Metadata name is required and must be <= 32 characters"
    );
  }

  if (metadata.uriType !== 0 && metadata.uriType !== 1) {
    throw new ValidationError("Invalid URI type");
  }

  if (!metadata.creators || !metadata.creators.length) {
    throw new ValidationError("At least one creator is required");
  }

  const totalShares = metadata.creators.reduce(
    (sum, creator) => sum + creator.share,
    0
  );
  if (totalShares !== 100) {
    throw new ValidationError("Creator shares must sum to 100");
  }
}

export function validateSaleConfig(config: SaleConfig) {
  // if (!config.prices || !config.prices.length) {
  //   throw new ValidationError("At least one price configuration is required");
  // }

  // config.prices.forEach((price) => {
  //   if (!price.amount || !(price.amount instanceof BN)) {
  //     throw new ValidationError(
  //       "Each price amount must be a valid BN instance"
  //     );
  //   }
  // });

  if (config.sendToVault < 0) {
    throw new ValidationError("sendToVault must be non-negative");
  }
}

export function validateSupply(supply: number) {
  if (typeof supply !== "number" || supply < 0) {
    throw new ValidationError("Supply must be a non-negative number");
  }
}

export function validateIdentifier(identifier: number) {
  if (typeof identifier !== "number" || identifier < 0) {
    throw new ValidationError("Identifier must be a non-negative number");
  }
}

export function validateCollectionArgs(
  collectionDetails: any,
  supply: number,
  metadata: any,
  irysData: any
) {
  if (!collectionDetails || typeof collectionDetails.__kind !== "string") {
    throw new ValidationError("Invalid collection details format");
  }

  if (typeof supply !== "number" || supply < 0) {
    throw new ValidationError("Supply must be a non-negative number");
  }

  if (!metadata) {
    throw new ValidationError("Metadata is required");
  }

  // Validate metadata fields
  if (!metadata.symbol || metadata.symbol.length > 10) {
    throw new ValidationError(
      "Symbol is required and must be <= 10 characters"
    );
  }

  if (!metadata.name || metadata.name.length > 32) {
    throw new ValidationError("Name is required and must be <= 32 characters");
  }

  if (!metadata.creators || !Array.isArray(metadata.creators)) {
    throw new ValidationError("Creators array is required");
  }

  const totalShares = metadata.creators.reduce(
    (sum: number, creator: any) => sum + creator.share,
    0
  );
  if (totalShares !== 100) {
    throw new ValidationError("Creator shares must sum to 100");
  }

  // Validate Irys data
  if (!irysData || !irysData.options || !irysData.options.metadata) {
    throw new ValidationError("Invalid Irys data format");
  }

  if (
    !irysData.options.metadata.files ||
    !irysData.options.metadata.files.file
  ) {
    throw new ValidationError("Collection image file is required");
  }
}

export function validateBuySingleArgs(
  payer: Signer,
  packAccount: PublicKey,
  burnProgress: PublicKey,
  owner: PublicKey,
  distributionBumps: number[],
  globalStoreAccount: PublicKey,
  extraAccounts: any[],
  collectionAddress?: PublicKey,
  storeAccount?: PublicKey,
  creator?: PublicKey
) {
  if (!payer || !payer.publicKey) {
    throw new ValidationError("Invalid payer");
  }

  if (!PublicKey.isOnCurve(packAccount)) {
    throw new ValidationError("Invalid pack account public key");
  }

  if (!PublicKey.isOnCurve(burnProgress)) {
    throw new ValidationError("Invalid burn progress public key");
  }

  if (!PublicKey.isOnCurve(owner)) {
    throw new ValidationError("Invalid owner public key");
  }

  if (!Array.isArray(distributionBumps) || distributionBumps.length !== 6) {
    throw new ValidationError(
      "Distribution bumps must be an array of length 6"
    );
  }

  distributionBumps.forEach((bump, index) => {
    if (typeof bump !== "number" || bump < 0 || bump > 255) {
      throw new ValidationError(`Invalid distribution bump at index ${index}`);
    }
  });

  if (!storeAccount) {
    throw new ValidationError("Store account missing");
  }

  if (PublicKey.isOnCurve(storeAccount)) {
    throw new ValidationError("Invalid store account public key");
  }

  if (PublicKey.isOnCurve(globalStoreAccount)) {
    throw new ValidationError("Invalid global store account public key");
  }

  if (!collectionAddress) {
    throw new ValidationError("Collection address missing");
  }

  if (!PublicKey.isOnCurve(collectionAddress)) {
    throw new ValidationError("Invalid collection address public key");
  }

  if (!creator) {
    throw new ValidationError("Creator public key missing");
  }

  if (!PublicKey.isOnCurve(creator)) {
    throw new ValidationError("Invalid creator public key");
  }

  if (!Array.isArray(extraAccounts)) {
    throw new ValidationError("Extra accounts must be an array");
  }

  extraAccounts.forEach((account, index) => {
    if (!account.pubkey || PublicKey.isOnCurve(account.pubkey)) {
      throw new ValidationError(
        `Invalid public key in extra accounts at index ${index}`
      );
    }
    if (typeof account.isSigner !== "boolean") {
      throw new ValidationError(
        `Invalid isSigner flag in extra accounts at index ${index}`
      );
    }
    if (typeof account.isWritable !== "boolean") {
      throw new ValidationError(
        `Invalid isWritable flag in extra accounts at index ${index}`
      );
    }
  });
}
