const Candidate = artifacts.require("./Candidate.sol");

module.exports = deployer => {
  deployer.deploy(Candidate, "BIM 2021", "BIM", 10, 5000000000000);
};
