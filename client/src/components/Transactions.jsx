import React, {useContext} from 'react';
import {TransactionContext} from '../context/TransactionContext';
import DummyData from '../utils/DummyData';
import {addressShortener} from '../utils/addressShortener.js';

const Transactions = () => {
    const {currentAccount} = useContext(TransactionContext);
     
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
                
                </div>
                
            </div>
        </div>
    )
}

export default Transactions;