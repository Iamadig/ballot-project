import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config()

async function main() {
    const contractAddress = process.argv[2];
    //0x6449ae1c17f382d88a25b079842aa7392b7827af
    const targetAddress = process.argv[3];
    const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    const signer = wallet.connect(provider);
    const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = ballotContractFactory.attach(
      contractAddress
    );
    const tx = await ballotContract.delegate(targetAddress);
    tx.wait();
    console.log(`Votes have been delegated from ${contractAddress} to the following address ${targetAddress}`);
    // QUESTION: How to access number of votes? ie. how to access variables within the solidity contract?
    
 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});