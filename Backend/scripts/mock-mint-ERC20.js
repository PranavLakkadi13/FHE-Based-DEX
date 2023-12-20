const { ethers, network } = require("hardhat");
const { createInstance } = require("fhevmjs");
const { getInstance, provider } = require("./interaction");

// const contractAddress = "0x2e1771fcEFFA28Fd49910AC8aAc647f01A86b58A";
const signer = new ethers.Wallet(process.env.Private_Key,provider);
const address = "0xF132c32539d2E27E18eC34C3a113489a26687Fa9"


async function mintToken (amount) {
  amount = 1000
  const contract = await ethers.getContractAt("EncryptedMOCKERC20",address,signer);
  const fhevm = await getInstance();

  console.log(`Encrypting the amount sent : ${amount}`);

  const encryptedValue = fhevm.encrypt32(amount);

  console.log("Sending the transaction");

  const transaction = await contract.mint(encryptedValue);
  console.log("Waiting for the transaction to go through");

  await provider.waitForTransaction(transaction.hash);

  console.log("Transaction is done!!!!!!")
};


mintToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });