# DocsVerify

DocsVerify is a decentralized document verification system that securely stores documents in hashed form and allows users to verify documents with a single click. The platform supports storing multiple documents in a single hash for efficient management and quick verification.

## Features

- **Secure Hash Storage**: Convert and store documents as unique hash values.
- **One-Click Verification**: Instantly verify the authenticity of documents.
- **Multiple Docs in One Hash**: Store multiple documents under a single hash identifier.
- **Decentralized & Immutable**: Ensures document integrity using blockchain technology.
- **User-Friendly Interface**: Simplified UI for easy document upload and verification.

## Installation

### Prerequisites
- Node.js & npm installed
- Solidity for smart contract deployment
- IPFS or any decentralized storage (if applicable)
- Web3.js or Ethers.js for blockchain interactions

### Clone the Repository
```sh
git clone https://github.com/mk016/docsverify.git
cd docsverify
```

### Install Dependencies
```sh
npm install
```

### Run the Application
```sh
npm start
```

## Usage
1. **Upload Document**: Select and upload documents, generating a unique hash.
2. **Store Hash**: The generated hash is stored securely on the blockchain.
3. **Verify Document**: Upload the document again to compare its hash and verify its authenticity.

## Smart Contract
The project leverages Ethereum smart contracts for storing and verifying document hashes. The contract includes functions for:
- Storing document hashes
- Retrieving hashes for verification
- Mapping multiple documents to a single hash

## Technologies Used
- **Frontend**: React.js, Web3.js/Ethers.js
- **Backend**: Node.js, Express.js
- **Blockchain**: Ethereum (Solidity Smart Contracts)
- **Storage**: IPFS/Decentralized Storage

## Future Enhancements
- Integrate anonymous Aadhaar verification
- Multi-chain support for better scalability
- UI/UX improvements for enhanced user experience

## License
MIT License

## Contributors
- **Devarshi Patel** ([@yourgithub](https://github.com/yourgithub))
