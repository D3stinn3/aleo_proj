import { useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import "./App.css";
import highlevelauction_program from "../helloworld_highlevelauction/build/main.aleo?raw"; // Adjust path if needed
import { AleoWorker } from "./workers/AleoWorker.js";

const aleoWorker = AleoWorker();

function App() {
  const [account, setAccount] = useState(null);
  const [address, setAddress] = useState(null); // Add a state to store the public address
  // const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [claimingPrize, setClaimingPrize] = useState(false);

  // Generate Aleo account
  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    const privateKeyString = await key.to_string()
    setAccount(privateKeyString);
    console.log("Private Key:", privateKeyString);

    // Get the corresponding public address
    const publicAddress = await aleoWorker.getPublicAddress(privateKeyString);
    const publicAddressString = await publicAddress.toString()
    setAddress(publicAddressString);
    console.log("Public Address:", publicAddressString);
  };

  // Execute "place_bid" function
  async function placeBid() {

    if (!account) {
      alert("Please generate an account first.");
      return;
    }

    setPlacingBid(true);
    const bidderAddress = address; // Ensure this is your account address
    const bidAmount = "100u64"; // You can make this dynamic based on user input

    try {
      const result = await aleoWorker.localProgramExecution(
        highlevelauction_program,
        "place_bid",
        [bidderAddress, bidAmount]
      );
      alert(`Bid placed successfully: ${JSON.stringify(result)}`);
    } catch (e) {
      console.error(e);
      alert("Error placing bid, check console for details");
    }
    setPlacingBid(false);
  }

  // Execute "resolve" function
  async function resolveAuction() {
    setResolving(true);
    // Example Bid objects; replace these with actual data if needed
    const firstBid = {
      owner: "aleo1...",
      bidder: "aleo1...",
      amount: "100u64",
      is_winner: false
    };
    const secondBid = {
      owner: "aleo1...",
      bidder: "aleo1...",
      amount: "50u64",
      is_winner: false
    };

    try {
      const result = await aleoWorker.localProgramExecution(
        highlevelauction_program,
        "resolve",
        [firstBid, secondBid]
      );
      alert(`Auction resolved successfully: ${JSON.stringify(result)}`);
    } catch (e) {
      console.error(e);
      alert("Error resolving auction, check console for details");
    }
    setResolving(false);
  }

  // Execute "claim" function
  async function claimPrize() {
    setClaimingPrize(true);
    const winningBid = {
      owner: "aleo1...",
      bidder: account,
      amount: "100u64",
      is_winner: true
    };

    try {
      const result = await aleoWorker.localProgramExecution(
        highlevelauction_program,
        "claim",
        [winningBid]
      );
      alert(`Prize claimed successfully: ${JSON.stringify(result)}`);
    } catch (e) {
      console.error(e);
      alert("Error claiming prize, check console for details");
    }
    setClaimingPrize(false);
  }

  // Deploy new contract
  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(highlevelauction_program);
      console.log("Transaction:");
      console.log("https://explorer.hamp.app/transaction?id=" + result);
      alert("Transaction ID: " + result);
    } catch (e) {
      console.error(e);
      alert("Error with deployment, check console for details");
    }
    setDeploying(false);
  }

  return (
    <>
      <div>
        <a href="https://aleo.org" target="_blank">
          <img src={aleoLogo} className="logo" alt="Aleo logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Aleo High-Level Auction</h1>
      <div className="card">
        <button onClick={generateAccount}>
          {account
            ? `Account: ${JSON.stringify(account)}`
            : `Click to generate account`}
        </button>
      </div>
      
      <div className="card">
        <h2>Bid Functions</h2>
        <button disabled={placingBid} onClick={placeBid}>
          {placingBid ? `Placing Bid...` : `Place a Bid`}
        </button>
      </div>

      <div className="card">
        <h2>Auction Functions</h2>
        <button disabled={resolving} onClick={resolveAuction}>
          {resolving ? `Resolving Auction...` : `Resolve Auction`}
        </button>
      </div>

      <div className="card">
        <h2>Prize Functions</h2>
        <button disabled={claimingPrize} onClick={claimPrize}>
          {claimingPrize ? `Claiming Prize...` : `Claim Prize`}
        </button>
      </div>

      <div className="card">
        <h2>Deployment</h2>
        <button disabled={deploying} onClick={deploy}>
          {deploying ? `Deploying...` : `Deploy Auction Contract`}
        </button>
      </div>
    </>
  );
}

export default App;

