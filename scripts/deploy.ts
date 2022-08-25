import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const PenguContract = await ethers.getContractFactory("Pengu");
  const PenguInstance = await PenguContract.deploy();

  await PenguInstance.deployed();

  await PenguInstance.connect(owner).setPaused(false);

  console.log("Deployed contract:", PenguInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
