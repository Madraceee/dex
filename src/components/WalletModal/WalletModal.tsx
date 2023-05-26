import React, { MouseEventHandler, useContext} from "react";
import { GlobalContext, ModalState, WalletState } from "../../context/GlobalContext";
import Loader from "../Loader";
import { ethers } from "ethers";

const WalletModal = (): React.ReactElement<any, string | React.JSXElementConstructor<any>> =>{
    
    const {walletState,setAddress,setBalance,setWalletState,setOpenModal} = useContext(GlobalContext);
  
    const connectWallet: MouseEventHandler = async ()=>{
        
        if(!window.ethereum){
            alert("Install Metamask");
            return;
        }
        const provider: ethers.providers.Web3Provider | null = new ethers.providers.Web3Provider(window.ethereum,"any");
        if(provider){
            const chainId = await window.ethereum?.request({method:'eth_chainId'});           
            setWalletState(WalletState.CONNECTING);
            
            try{
                await provider.send("eth_requestAccounts",[]);
            }
            catch(error){
                console.log(error);
                setWalletState(WalletState.NOTCONNECTED)
                return;
            }
            
            const signer: ethers.providers.JsonRpcSigner | null = provider.getSigner();

            if(signer){

                if(chainId !=="0x89"){
                    try{
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: "0x89"}],
                          });
                    }
                    catch(error){
                        console.log(error);
                        setWalletState(WalletState.NOTCONNECTED);
                        return;
                    }
                    
                }                
                const address = await signer.getAddress();
                const balance = await signer.getBalance();
        
                setAddress(address);
                setBalance(ethers.utils.formatEther(balance));

                setWalletState(WalletState.CONNECTED);
                setOpenModal(ModalState.SWAP);        
                           
            }
            else{
                setWalletState(WalletState.NOTCONNECTED);
            }   
            return ;         
        }
    }

    return (
        <div className="w-full sm:w-96">            
            { walletState === WalletState.NOTCONNECTED && 
                (
                    <div className="flex flex-col my-5 w-1/2 items-center justify-center mx-auto gap-5">
                        <button 
                            className="px-3 py-2 bg-blue-500 text-white font-bold rounded-md text-xs sm:text-base"
                            onClick={connectWallet}
                        >
                            Connect To Metamask
                        </button>
                    </div>
                )
            }
            { walletState === WalletState.CONNECTING &&
                (   
                    <Loader />
                )
            }
        </div>
    );
}

export default WalletModal;
export const headerWallet: string = "Choose Wallet";