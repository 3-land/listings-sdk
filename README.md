# 3Land Solana SDK

A Node.js SDK for interacting with 3Land's Solana programs. This SDK provides a simple and intuitive way to integrate with 3Land's smart contracts on the Solana blockchain.

## Prerequisites

Before using this SDK, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- [Solana CLI Tools](https://docs.solana.com/cli/install-solana-cli-tools)

## Installation
Run this command to install all the packages needed for the sdk
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

Inside `storeExample.ts` file in your project add the following configuration:

```typescript
async function main() {
  const options: StoreInitOptions = {
    walletPath: "", //add route to keypair.json generated from the solana cli
  };
.
.
.
```

## Usage

[PENDING]

## Features

[PENDING]

## Error Handling

[Error handling documentation will be added here...]

## Contributing

[Contribution guidelines will be added here...]

## License

[License information will be added here...]
