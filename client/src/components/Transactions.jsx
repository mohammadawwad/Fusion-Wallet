import React, {useContext} from 'react';
import {TransactionContext} from '../context/TransactionContext';
import DummyData from '../utils/DummyData';
import {addressShortener} from '../utils/addressShortener.js';
import useFetch from '../hooks/useFetch';

//card generator for previous transactions
const TransactionCard = ({addressTo, addressFrom, timestamp, message, amount, url, keyword}) => {

    //custom hook for fetching the gifs
    const gifURL = useFetch({keyword});
    
    return (
        <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-full flex-col p-3 rounded-md hover:shadow-2xl">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    {/*Shows who it is from and the link to the ropsten network*/}
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">From: {addressShortener(addressFrom)}</p>
                    </a>

                    {/*Shows who it is sent to and the link to the ropsten network*/}
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">To: {addressShortener(addressTo)}</p>
                    </a>

                    {/*Outputs the amount sent*/}
                    <p className="text-white text-base"> Amount: {amount} ETH</p>

                    {/*the message sent with the specific transaction*/}
                    {
                        message && (
                            <>
                                <br/>
                                <p className="text-white text-base">Message: {message}</p>
                            </>
                        )
                    }
                </div>

             
                {/*Rendering the real or dummy image/gif */}
                <img
                    src={gifURL || url}
                    alt="gif"
                    className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                />
            
                {/*timestamp sent*/}
                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>
                
            </div>
        </div>
    );
}


const Transactions = () => {
    const {currentAccount, transactions} = useContext(TransactionContext);
    
    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {/* Heading the shows the latest transactions if we have our account connected*/}
                {/*if your not connected prompt the user to connect their wallet*/}
                {
                   currentAccount ? (
                        <h3 className="text-white text-3xl text-center my-2">Your Latest Transactions</h3>
                    ) : (
                        <h3 className="text-white text-3xl text-center my-2">Connect Your Account To See The Latest Transactions</h3>
                    )
                }

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {/*Rendering dummy data from the latest to the last*/}
                    {
                        transactions.reverse().map((transaction, i) => (
                            <TransactionCard key={i} {...transaction}/>
                        ))
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Transactions;