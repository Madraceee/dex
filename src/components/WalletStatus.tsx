import { useContext, useEffect } from "react";
import {GlobalContext, ModalState, WalletState } from "../contexts/GLobalContext";

const WalletStatus =  () => {

    const {walletState,address,setWalletState, setAddress,setBalance,setOpenModal} = useContext(GlobalContext);

    const formatAddress = ():string =>{
        if(address === ""){
            return "";
        }

        const length = address.length;
        const formattedAddress = address.slice(0,5)+"...."+address.slice(length-4,length-1);
        return formattedAddress;
    }

    return (
        <div>
            { (walletState === WalletState.NotConnected || walletState === WalletState.Connecting) &&
                (
                    <button 
                        className="px-3 py-2 bg-blue-500 text-white font-bold rounded-md opacity-80 hover:scale-110 hover:opacity-100 ease-in-out duration-200"
                        onClick={()=>{setOpenModal(ModalState.Wallet)}}
                    >
                        Connect
                    </button>
                )
            }
            { walletState === WalletState.Connected &&
                (
                    <div className="px-4 py-2 bg-[#12121297] rounded-md font-semibold">
                        {formatAddress()}
                    </div>
                )                
            }
        </div>
    );
}

export default WalletStatus;