# Aleo High-Level Auction dApp

This project is a decentralized auction application built on the Aleo blockchain using React and the Leo programming language. It allows users to participate in auctions by placing bids, resolving auctions, and claiming prizes, all while leveraging Aleo's privacy-preserving blockchain capabilities.

## Features

- **Account Management**: Generate Aleo accounts with associated public addresses.
- **Bidding System**: Place bids on auctions securely.
- **Auction Resolution**: Resolve auctions to determine winners.
- **Prize Claiming**: Claim prizes for winning bids.
- **Contract Deployment**: Deploy auction contracts to the Aleo blockchain.

## Getting Started

### Prerequisites

Before, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- Access to the Aleo blockchain network.
- A valid Aleo account and private key.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/aleo-high-level-auction.git
   cd aleo-high-level-auction
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Follow the instructions to install Leo [here](https://github.com/AleoHQ/leo).

### Running the Application

To start the application in development mode, run:

```bash
npm run dev
```

Your app should be accessible at [http://localhost:5173/](http://localhost:5173/).

### Key Functions

- **Generate Account**: Creates a new Aleo account and displays the private key and public address.
- **Place Bid**: Allows users to place a bid on an auction.
- **Resolve Auction**: Determines the winner(s) of the auction based on the highest bid(s).
- **Claim Prize**: Allows the winning bidder to claim their prize.
- **Deploy Auction Contract**: Deploys a new auction contract to the Aleo blockchain.

### Usage

1. **Generate an Aleo Account**: Click the "Click to generate account" button to create a new Aleo account.
2. **Place a Bid**: Ensure you have generated an account, then click "Place a Bid" to participate in the auction.
3. **Resolve Auction**: Click "Resolve Auction" to determine the winner(s) of the auction.
4. **Claim Prize**: If you are the winning bidder, click "Claim Prize" to receive your prize.
5. **Deploy Auction Contract**: Click "Deploy Auction Contract" to deploy a new auction contract.

### Notes

- Make sure to replace placeholder addresses such as `"aleo1..."` with actual Aleo addresses.
- Adjust paths and configurations as necessary to match your development environment.

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.