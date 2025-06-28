require("dotenv").config();
const { ethers } = require("ethers");

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(URL);

// Define "Application Binary Interface"

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
];

// Setup contract

const ERC20_ADD = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
// const contract = new ethers.Contract("dai.token.ethers.eth", abi, provider);
const contract = new ethers.Contract(ERC20_ADD, ERC20_ABI, provider);

async function main() {
  // Get contract state

  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const totalSupply = await contract.totalSupply();

  // Log contract state

  console.log(`\n Reading From ${ERC20_ADD}`);
  console.log(`Name ${name}`);
  console.log(`Symbol ${symbol}`);
  console.log(`Decimals ${decimals}`);
  console.log(`TotalSupply ${totalSupply}`);
  // Get ERC20 balance

  const userAddress = "0x420ef1f25563593aF5FE3f9b9d3bC56a8bd8c104";
  const balance = await provider.getBalance(userAddress);

  console.log("Balance of", balance);

  // Log ERC20 balance
}

main();

// c5836cbfe4b0fe8b91f8868d6a9d6ddc00d32b5afa5c20eb01d2034bd0ed0459
