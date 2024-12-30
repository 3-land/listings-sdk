# 3Land Solana SDK

A Node.js SDK for interacting with 3Land's Solana programs. This SDK provides a simple and intuitive way to integrate with 3Land's smart contracts on the Solana blockchain.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Network Configuration](#network-configuration)
   - [Basic Network Selection](#basic-network-selection)
   - [Custom Configuration](#custom-configuration)
   - [Environment Setup](#environment-specific-setup)
4. [Wallet Setup](#wallet-setup)
   - [Devnet Setup](#devnet-wallet-setup)
   - [Mainnet Setup](#mainnet-wallet-setup)
5. [Usage](#usage)
   - [Creating a Store](#creating-a-store)
   - [Creating a Collection](#creating-a-collection)
   - [Creating a Single Edition NFT](#creating-a-single-edition-nft)
   - [Buying an NFT](#buying-an-nft)
6. [Features](#features)
7. [Error Handling](#error-handling)
8. [Contributing](#contributing)
9. [Support](#support)
10. [License](#license)

## Prerequisites

Before using this SDK, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- [Solana CLI Tools](https://docs.solana.com/cli/install-solana-cli-tools)

## Installation

Clone the repo

```bash
git clone https://github.com/biccsdev/3land_sdk.git
# or
npm install 3land_sdk
```

Run this command to install all the packages needed for the sdk

```bash
npm install
# or
yarn add
```

## Network Configuration

### Basic Network Selection

```typescript
import { Store, NetworkType } from "@3land/solana-sdk";

// For Devnet (default)
const devnetStore = new Store();

// For Mainnet
const mainnetStore = new Store({
  network: NetworkType.MAINNET,
});
```

### Custom Configuration

```typescript
// Using custom RPC endpoint
const store = new Store({
  network: NetworkType.MAINNET,
  customEndpoint: "https://your-custom-rpc.com",
});

// Using custom configuration
const storeWithCustomConfig = new Store({
  network: NetworkType.MAINNET,
  customConfig: {
    programId: "your_custom_program_id",
    // other config options...
  },
});
```

### Environment-Specific Setup

```typescript
import dotenv from "dotenv";
dotenv.config();

const store = new Store({
  network: (process.env.SOLANA_NETWORK as NetworkType) || NetworkType.DEVNET,
  customEndpoint: process.env.SOLANA_RPC_ENDPOINT,
  customConfig: {
    programId: process.env.PROGRAM_ID,
  },
});
```

Example `.env` file:

```env
SOLANA_NETWORK=mainnet-beta
SOLANA_RPC_ENDPOINT=https://your-custom-rpc.com
PROGRAM_ID=your_program_id
```

## Wallet Setup

### Devnet Wallet Setup

```bash
solana-keygen new --outfile ~/.config/solana/devnet-wallet.json
solana config set --url https://api.devnet.solana.com
solana config set --keypair ~/.config/solana/devnet-wallet.json
solana airdrop 2
```

### Mainnet Wallet Setup

```bash
solana-keygen new --outfile ~/.config/solana/mainnet-wallet.json
solana config set --url https://api.mainnet-beta.solana.com
solana config set --keypair ~/.config/solana/mainnet-wallet.json
```

## Usage

### Creating a Store

```typescript
import { StoreConfig, FeeType } from "@3land/solana-sdk";
import { BN } from "bn.js";

try {
  const storeConfig: StoreConfig = {
    fee: new BN(1000000), // Fee in lamports
    feePercentage: 5, // Must be between 0-100
    feeType: new FeeType.AllMints(),
    trust: payer.publicKey,
    rules: [],
  };

  // Creator and storeId are optional, will default to payer.publicKey and random number
  const createStoreTxId = await store.createStore(
    walletKeypair,
    "My 3Land Store",
    storeConfig
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

  / Prepare your image files
  const imageBuffer = fs.readFileSync("path/to/image.gif").buffer;
  const coverBuffer = fs.readFileSync("path/to/cover.jpeg").buffer;

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
    metadata,
    {
      options: collectionOptions
    },
    false, // Mutable flag (optional)
    0 // Supply (optional)
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
    [1, 0, 0], // Category
    [1, 0], // Super Category
    0, // Event Category
    12345, // Hash Traits
    collectionPublicKey,
    {
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
  // Most parameters are optional and have default values
  const buyTx = await store.buySingleEdition(
    walletKeypair,
    [0, 0, 0, 0, 0, 0], // Distribution bumps
    itemAddress // The NFT's item account address
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
  - Support for various file types (jpeg, png, glb, mp3, mp4)
  - Automatic URI generation

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

## Support

For support, please create an issue in the GitHub repository or contact the 3Land team directly.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
