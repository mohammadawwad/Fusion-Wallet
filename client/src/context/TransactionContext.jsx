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
    const [currentAccount, setCurrentAccount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'));

    //form data hooks
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

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
                //getAllTransactions();
            }
            else{
                console.log('No Accounts Found');
            }
    
            console.log(accounts);   
            
        } catch(error){
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

            //connects first account
            setCurrentAccount(accounts[0]);
            
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
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch (error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }
    
    //calls the function at the start once
    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])
    
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}