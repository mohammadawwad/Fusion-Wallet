// SPDX-License-Identifier: UNLICENSED



//solidity version
pragma solidity ^0.8.0;

//similar to class in OOP
contract Transactions {
    //number variable
    uint256 transactionCount;

    //event is a function, that needs to later be emited
    //addres is a type, from is the var name
    event Transfer(address from, address reciever, uint amount, string message, uint256 timestamp, string keyword);

    //structure's are similar to objects
    //states the properties that the stransaction needs to have
    struct TransferStruct {
        address sender;
        address reciever;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    //array of transfer structure (array of objects)
    TransferStruct[] transactions;

    //function that does not return anything
    function addToBlockchain(address payable reciever, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;

        //push method is similar to js push (adds it to the array)
        //msg is available whenever you have an object through thre blockchain
        //block.timestamp returns the time the function was executed on the blockchain
        transactions.push(TransferStruct(msg.sender, reciever, amount, message, block.timestamp, keyword));

        //An event is emitted, it stores the arguments passed in transaction logs
        emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
    }

    //returns list of transactions
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    //returns the number of transactions
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}