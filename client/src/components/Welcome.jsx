import React, {useContext} from 'react';
import {AiFillPlayCircle} from 'react-icons/ai';
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle} from 'react-icons/bs';
import {Loader} from './';
import {TransactionContext} from '../context/TransactionContext';
import {addressShortener} from '../utils/addressShortener';

//common stlyes used multiple times
const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

//input component generator
const InputGenerator = ({placeHolder, name, type, value, handleChange}) => (
    <input
        placeholder={placeHolder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    
    //connects your wallet
    const {connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading} = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const {addressTo, amount, keyword, message} = formData;
        e.preventDefault();

        //prevents empty form submission
        if(!addressTo || !amount || !keyword || !message){
            return;
        } 
        
        sendTransaction();
    }

    
    return(
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">

                    {/*Title*/}
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br/> all over the world
                    </h1>

                    <p className="text-left mt-5 text-white font-light md:w9/12 w-11/12 text-base">
                        Explore the crypto world, Fusion Wallet allows you to buy, sell, and gift random NFT's based of your keyword, along side Ethereum Transactions all over the world based.
                    </p>

                    {/*Button that connects your wallet if you arnt already connected*/}
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] py-3 px-10 rounded-full cursor-pointer transition ease-in-out delay-100 hover:scale-105  border-[#2952e3] hover:border-indigo-500 hover:bg-transparent duration-300 border-[1px]"
                        >
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                    )}

                    {/*All our features*/}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        {/*Top 3*/}
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>

                        <div className={commonStyles}>Security</div>

                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>

                        {/*Bottom 3*/}
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        
                        <div className={commonStyles}>Low Fees</div>

                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                
                {/*ethereum address card*/}
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                        
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                                      
                            <div>
                                <p className="text-white font-light text-sm">
                                    {addressShortener(currentAccount)}
                                </p>
                                
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum ID
                                </p>
                            </div>
                        </div>
                    </div>

                    {/*form with custom input*/}
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <InputGenerator placeHolder="Address To" name="addressTo" type="text" handleChange={handleChange}/>
                        <InputGenerator placeHolder="ETH Amount" name="amount" type="number" handleChange={handleChange}/>
                        <InputGenerator placeHolder="Keyword (NFT)" name="keyword" type="text" handleChange={handleChange}/>
                        <InputGenerator placeHolder="Message" name="message" type="text" handleChange={handleChange}/>

                        
                        <div className="h-[1px] w-full bg-gray-400 my-2"/>

                        {/*loading/button depending on form on send*/}
                        {isLoading ? (
                            <Loader/>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:border-indigo-500 duration-300 text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Send Now
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Welcome;