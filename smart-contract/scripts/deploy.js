

const main = async () => {
    // We get the contract to deploy
    //like a function factory or class that generates instances of the smart contract
    const Transactions = await hre.ethers.getContractFactory("Transactions");

    //specific instance of contract
    const transactions = await Transactions.deploy();
    await transactions.deployed();

    //.address returns address of contract deployed on the blockchain
    console.log("Transactions deployed to:", transactions.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const runMain = async () => {
    try {
        //executes and deploys the contract
        await main();

        //compiled seccessfully
        process.exit(0);
    } catch (error) {
        //error caught
        console.log(error);
        process.exit(1);
    }
}

runMain();
