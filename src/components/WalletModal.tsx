import React, { MouseEventHandler, useContext, ReactElement, JSXElementConstructor } from "react";
import { GlobalContext, ModalState, WalletState } from "../contexts/GLobalContext";
import Loader from "./Loader";
import { ethers } from "ethers";

const WalletModal = (): React.ReactElement<any, string | React.JSXElementConstructor<any>> =>{
    
    const {walletState,setAddress,setBalance,setWalletState,setOpenModal} = useContext(GlobalContext);
  
    const connectWallet: MouseEventHandler<HTMLButtonElement> = async ()=>{
        
        if(!window.ethereum){
            alert("Install Metamask");
            return;
        }
        const provider: ethers.providers.Web3Provider | null = new ethers.providers.Web3Provider(window.ethereum,"any");
        if(provider){
            const chainId = await window.ethereum?.request({method:'eth_chainId'});
            if(chainId!=="0x89"){
                alert("Change to Polygon Network");
                return ;
            }
            setWalletState(WalletState.Connecting);

            try{
                await provider.send("eth_requestAccounts",[]);
            }
            catch(error){
                console.log(error);
                setWalletState(WalletState.NotConnected)
                return;
            }
            
            const signer: ethers.providers.JsonRpcSigner | null = provider.getSigner();

            if(signer){
                setWalletState(WalletState.Connected);
                const address = await signer.getAddress();
                const balance = await signer.getBalance();
        
                setAddress(address);
                setBalance(ethers.utils.formatEther(balance));
                setOpenModal(ModalState.Null);                            
                           
            }
            else{
                setWalletState(WalletState.NotConnected);
            }   
            return ;         
        }

        alert("Install Metamask");
    }

    return (
        <div className="w-full sm:w-96">            
            { walletState === WalletState.NotConnected && 
                (
                    <div className="flex flex-col my-5 w-2/4 items-center justify-center mx-auto gap-5">
                        <h3 className="text-white mb-7">Choose Wallet</h3>
                        <button 
                            className="px-3 py-2 bg-blue-500 text-white font-bold rounded-md text-xs sm:text-base"
                            onClick={connectWallet}
                        >
                            Connect To Metamask
                        </button>
                    </div>
                )
            }
            { walletState === WalletState.Connecting &&
                (   
                    <Loader />
                )
            }
            { walletState === WalletState.Connected &&
                (
                    <h3 className="my-5 text-3xl">Connected</h3>
                )

            }
        </div>
    );
}

export default WalletModal;