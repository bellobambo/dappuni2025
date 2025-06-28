require("dotenv").config();
const { ethers } = require("ethers");

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js");

// Setup connection
const URL = process.env.TENDERLY_RPC_URL;
const provider = new ethers.JsonRpcProvider(URL);

const RECEIVER = "0x54490B24063bb4A1A09a30E050EaDF794f5c98c1";

async function main() {
  const privateKey = await promptForKey();

  // Setup wallet
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get balances

  const senderBalB4 = await provider.getBalance(wallet.address);
  const receiverBalB4 = await provider.getBalance(RECEIVER);

  // Log balances
  console.log(`\nSender Bal b4 : ${ethers.formatUnits(senderBalB4, 18)}`);
  console.log(`\nSender Bal b4 : ${ethers.formatUnits(receiverBalB4, 18)}`);

  // Create transaction
  const transaction = await wallet.sendTransaction({
    to: RECEIVER,
    value: ethers.parseUnits("1", 18),
  });

  // Wait transaction

  const receipt = await transaction.wait();

  console.log("transaction", transaction);
  console.log("receipt", receipt);

  // Get balances
  const senderBalAfta = await provider.getBalance(wallet.address);
  const receiverBalAfta = await provider.getBalance(RECEIVER);

  // Log balances
  console.log(`\nSender Bal after : ${ethers.formatUnits(senderBalAfta, 18)}`);
  console.log(
    `\nSender Bal after : ${ethers.formatUnits(receiverBalAfta, 18)}`
  );
}

main();
