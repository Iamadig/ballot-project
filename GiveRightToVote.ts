import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config()

async function main() {
  const contractAddress = process.argv[2];
  const targetAddress = process.argv[3];
  console.log(contractAddress);
  console.log(targetAddress);
  
  const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const signer = wallet.connect(provider);
  console.log(`Connected to the wallet ${signer.address}`);
  const balance = await signer.getBalance();
  console.log(`This address has a balance of ${balance} wei`);
  if (balance.eq(0)) throw new Error("I'm too poor");
  const ballotContractFactory = new Ballot__factory(signer);
  const ballotContract = ballotContractFactory.attach(
    contractAddress
  );
  const tx = await ballotContract.giveRightToVote(targetAddress);
  await tx.wait();
  console.log(`Done! The following address was given the right to vote: ${targetAddress} for the contract at address: ${contractAddress}`);
  //console.log(tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});