// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract JobContracts {

    struct JobContract {
        uint id;
        string conditions;
        uint reward;
        uint minimPoints;
        string taskTitle;
        string taskDetails;
        uint256 createdAt;

        bool released;
    }

    mapping(uint => JobContract) jobContracts;

    function createContract(uint id, string memory conditions, uint reward, uint minimPoints, 
                            string memory taskTitle, string memory taskDetails) public returns(uint) {
        
        JobContract memory newJob = JobContract(id, conditions, reward, minimPoints, taskTitle, taskDetails, block.timestamp, false);
        jobContracts[id] = newJob;

        return id;
    }

    function getContractDetails(uint id) public view returns(uint job_id, string memory conditions, uint reward, uint minimPoints, 
                            string memory taskTitle, string memory taskDetails, uint256 createdAt, bool released) {
        JobContract memory job = jobContracts[id];
        return (job.id, job.conditions, job.reward, job.minimPoints, job.taskTitle, job.taskDetails, job.createdAt, job.released);
    }

    function releaseContract(uint id) public returns(string memory) {
        jobContracts[id].released = true;
        //Send transfer
        return "12345";
    }

}