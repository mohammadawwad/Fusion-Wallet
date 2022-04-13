import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import {contractABI, contractAddress} from '../utils/Constants';

export const TransactionContext = React.createContext();

//metamask gives us access to ethereum object
const {ethereum} = window;

//function that fetches ethereum contract
const getEthrContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}


export const TransactionProvider = ({children}) => {

    //all states
    const [currentAccount, setCurrentAccount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    //form data hooks
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

    const getAllTransactions = async () => {
        try{
            //alerts if user doesnt have meta mask
            if(ethereum) {
                //returns all the transactions
                const transactionContract = getEthrContract();
                const availableTransactions = await transactionContract.getAllTransactions();
                
                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.reciever,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18) //written in hexadecimal gwei so we divide it by 10 to the power of 18
                }));
    
                console.log(structuredTransactions);
                setTransactions(structuredTransactions);
            } else {
                console.log("No Ethereum");
            }
            
        } catch(error) {
            console.log(error);
        }
    }
    
    //funstion that updates the form
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    
    const checkIfWalletIsConnected = async () => {

        try{
            //alerts if user doesnt have meta mask
            if(!ethereum) {
                return alert("Please Install MetMask");
            }
    
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if(accounts.length){
                setCurrentAccount(accounts[0]);
    
                //get all of the transactions
                getAllTransactions();
            } else {
                console.log('No Accounts Found');
            }

            
        } catch(error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }

    }

    const checkIfTransactionsExist = async () => {
        try{
            //gets the contract and number of transactions
            const transactionContract = getEthrContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        } catch(error) {
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }
    
    //connect the users wallet
    const connectWallet = async () => {
        try {
            if(!ethereum) {
                return alert("Please Install MetMask");
            }

            //requests ethereum accounts
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            //connects first account and reloads window
            setCurrentAccount(accounts[0]);
            window.location.reload();
            
        } catch (error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) {
                return alert("Please Install MetMask");
            }

            //gets the data from the form
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthrContract();

            //converts to decimal amount into GWEI hexadecimal amount
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //gas fee is 0.000021 (21000 GWEI)
                    value: parsedAmount._hex, 
                }]
            });


            //store transaction
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
            
            //gets and sets the new transaction count
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            window.location.reload();
        } catch (error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }
    
    //calls the function at the start once
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [])
    
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, handleChange, sendTransaction, transactions, isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}