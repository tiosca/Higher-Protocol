const JobContracts = artifacts.require("./JobContracts.sol");

module.exports = deployer => {
  deployer.deploy(JobContracts);
};