# 3Land Solana SDK

A Node.js SDK for interacting with 3Land's Solana programs. This SDK provides a simple and intuitive way to integrate with 3Land's smart contracts on the Solana blockchain.

## Prerequisites

Before using this SDK, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- [Solana CLI Tools](https://docs.solana.com/cli/install-solana-cli-tools)

## Installation

Run this command to install all the packages needed for the SDK:

```bash
npm install
# or
yarn add
```

## Initial Setup

### 1. Create a Solana Wallet

First, you'll need to create a Solana wallet using the Solana CLI:

```bash
# Install Solana CLI if you haven't already
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Create a new keypair
solana-keygen new --outfile ~/.config/solana/devnet-wallet.json

# Set the wallet as default
solana config set --keypair ~/.config/solana/devnet-wallet.json

# Switch to devnet for testing
solana config set --url https://api.devnet.solana.com

# Check your configuration
solana config get

# Check your current balance
solana balance

# Request an airdrop (you can request up to 2 SOL per request)
solana airdrop 2

# Verify the airdrop was successful
solana balance
```

### 2. Configure SDK

Create a new instance of the Store class with your Solana endpoint:

```typescript
import { Store } from "./path-to-sdk/Store";

const store = new Store("https://api.devnet.solana.com"); // Use appropriate endpoint
```

## Usage

### Creating a Store

```typescript
import { StoreConfig, FeeType } from "./types/types";
import { BN } from "bn.js";

try {
  const storeConfig: StoreConfig = {
    fee: new BN(1000000), // Fee in lamports
    feePercentage: 5, // Must be between 0-100
    feeType: new FeeType.AllMints(),
    trust: payer.publicKey,
    rules: [],
  };

  const createStoreTxId = await store.createStore(
    walletKeypair,
    "My 3Land Store",
    storeConfig,
    Math.floor(Math.random() * 100), // Random store ID
    payer.publicKey
  );

  console.log("Store created successfully:", createStoreTxId);
} catch (error) {
  if (error.name === "ValidationError") {
    console.error("Invalid parameters:", error.message);
  } else {
    console.error("Store creation failed:", error);
  }
}
```

### Creating a Collection

```typescript
try {
  const creator = new Creator({
    address: payer.publicKey,
    verified: false,
    share: 100,
  });

  const metadata = {
    symbol: "LAND", // Max 10 characters
    name: "3Land Collection", // Max 32 characters
    uri: "",
    sellerFeeBasisPoints: new BN(0),
    creators: [creator],
    collection: null,
    uses: null,
  };

  const collectionOptions = {
    symbol: "SDK",
    metadata: {
      name: metadata.name,
      description: "3Land Collection Description",
      files: {
        file: {
          arrayBuffer() {
            return imageBuffer;
          },
          type: "image/png",
        },
        cover: {
          arrayBuffer() {
            return coverBuffer;
          },
          type: "image/png",
        },
      },
    },
    creators: metadata.creators,
    traits: [{ attribute1: "value1" }, { attribute2: "value2" }],
    sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
  };

  const collectionTx = await store.createCollection(
    walletKeypair,
    { __kind: "V1", size: 0 },
    0, // Supply must be 0 for collections
    metadata,
    false, // Mutable flag
    {
      address: payer.publicKey,
      payer: payer.publicKey,
      signer: walletKeypair,
      options: collectionOptions,
    }
  );

  console.log("Collection created successfully:", collectionTx);
} catch (error) {
  console.error("Collection creation failed:", error);
}
```

### Creating a Single Edition NFT

```typescript
try {
  const metadata = {
    name: "My 3Land NFT",
    uri: "",
    uriType: 1,
    sellerFeeBasisPoints: 500,
    collection: collectionPublicKey,
    creators: [creator],
  };

  const saleConfig = {
    prices: [
      {
        amount: new BN(1000000),
        priceType: new CurrencyType.Native(),
      },
    ],
    priceType: new PriceRule.None(),
    rules: [],
    sendToVault: 0,
    saleType: new SaleType.Normal(),
  };

  const singleEditionTx = await store.createSingleEdition(
    walletKeypair,
    storeAccount,
    100, // Supply
    metadata,
    saleConfig,
    Math.floor(Math.random() * 100), // Random identifier
    [1, 0, 0], // Category
    [1, 0], // Super Category
    0, // Event Category
    12345, // Hash Traits
    payer.publicKey,
    collectionPublicKey,
    {
      address: payer.publicKey,
      payer: payer.publicKey,
      signer: walletKeypair,
      options: nftOptions,
    }
  );

  console.log("Single edition created successfully:", singleEditionTx);
} catch (error) {
  console.error("Single edition creation failed:", error);
}
```

### Buying an NFT

```typescript
try {
  const buyTx = await store.buySingleEdition(
    walletKeypair,
    packAccount,
    burnProgress,
    owner.publicKey,
    [0, 0, 0, 0, 0, 0], // Distribution bumps
    storeAccount,
    globalStoreAccount,
    collectionAddress,
    creator.publicKey,
    identifier,
    [
      {
        pubkey: globalStoreAccount,
        isSigner: false,
        isWritable: true,
      },
    ]
  );

  console.log("Purchase successful:", buyTx);
} catch (error) {
  console.error("Purchase failed:", error);
}
```

## Features

- **Store Management**

  - Create and configure NFT stores
  - Set custom fee structures

- **Collection Management**

  - Create NFT collections
  - Configure collection metadata
  - Set collection-wide properties

- **NFT Operations**

  - Mint single edition NFTs
  - Configure NFT metadata
  - Set pricing and sale rules
  - Handle NFT purchases

- **Built-in Validations**

  - Input parameter validation
  - Transaction error handling
  - Comprehensive error messages

- **Decentralized Storage**
  - Integrated with Irys for metadata storage
  - Support for various file types ( jpeg, png, glb, mp3, mp4 )
  - Automatic URI generation

## Error Handling

The SDK includes comprehensive error validation and handling:

### Validation Rules

- **Store Creation**

  - Store name must be 32 characters or less
  - Fee percentage must be between 0 and 100
  - Valid public keys required for trust and payer

- **Collection Creation**

  - Symbol must be 10 characters or less
  - Name must be 32 characters or less
  - Creator shares must sum to 100
  - Valid image files required

- **Single Edition Creation**

  - Valid metadata structure
  - Proper sale configuration
  - Valid collection reference
  - Non-negative supply values

- **Purchase Operations**
  - Valid account public keys
  - Proper distribution parameters
  - Valid identifier values

### Error Types

```typescript
try {
  // SDK operations
} catch (error) {
  if (error.name === "ValidationError") {
    // Handle validation errors
    console.error("Invalid parameters:", error.message);
  } else if (error instanceof SendTransactionError) {
    // Handle Solana transaction errors
    console.error("Transaction failed:", error.logs);
  } else {
    // Handle other errors
    console.error("Operation failed:", error);
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please create an issue in the GitHub repository or contact the 3Land team directly.
