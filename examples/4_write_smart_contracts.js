require("dotenv").config();
const { ethers } = require("ethers");

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js");

// Setup connection
const URL = process.env.TENDERLY_RPC_URL;
const provider = new ethers.JsonRpcProvider(URL);

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
];

// Setup contract
const ERC20_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC Contract
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider);

// Define reciever
const RECIEVER = "0xD51F2c11B91054Ea95F8B7CC2D1B97F31A34F766"; // Your account address 2

async function main() {
  const privateKey = await promptForKey();

  // Setup wallet
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get ERC20 balances
  const recieverBalanceBefore = await contract.balanceOf(RECIEVER);
  const senderBalanceBefore = await contract.balanceOf(wallet.address);

  // Log ERC20 balances
  console.log(`\nReading from ${ERC20_ADDRESS}\n`);
  console.log(`Sender balance before: ${senderBalanceBefore}\n`);
  console.log(`Reciever balance before: ${recieverBalanceBefore}\n`);

  // Setup amount to transfer
  const decimals = await contract.decimals();
  const AMT = ethers.parseUnits("1", decimals);

  // Create transaction

  const transaction = await contract.connect(wallet).transfer(RECIEVER, AMT);

  // Wait transaction
  await transaction.wait();

  // Log transaction

  // Get ERC20 balances
  const senderBalanceAfter = await contract.balanceOf(RECIEVER);
  const recieverBalanceAfter = await contract.balanceOf(wallet.address);

  console.log(`\nBalance of sender: ${senderBalanceAfter}`);
  console.log(`Balance of reciever: ${recieverBalanceAfter}\n`);
}

main();

// c5836cbfe4b0fe8b91f8868d6a9d6ddc00d32b5afa5c20eb01d2034bd0ed0459
