import { useContext, useState, useEffect } from "react";
import {GlobalContext, ModalState, WalletState } from "../contexts/GLobalContext";
import ModalManager from "./ModalManager";

const WalletStatus =  () => {

    const {walletState,address,setWalletState, setAddress,setBalance} = useContext(GlobalContext);
    const [showModal,setShowModal] = useState<ModalState>(ModalState.Null);

    const formatAddress = ():string =>{
        if(address === ""){
            return "";
        }

        const length = address.length;
        const formattedAddress = address.slice(0,5)+"...."+address.slice(length-4,length-1);
        return formattedAddress;
    }

    useEffect(() => {
        const handleAccountChange = () => {
          setWalletState(WalletState.NotConnected);
          setAddress("");
          setBalance("")
        };

        if (window.ethereum) {
          window.ethereum.on('accountsChanged', handleAccountChange);
        }
    
        return () => {
          if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', handleAccountChange);
          }
        };
      }, []);

    return (
        <div>
            <ModalManager 
                state={showModal}
                closeModal={()=>setShowModal(ModalState.Null)}
            />
            { (walletState === WalletState.NotConnected || walletState === WalletState.Connecting) &&
                (
                    <button 
                        className="px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:scale-110 ease-in-out duration-200"
                        onClick={()=>{setShowModal(ModalState.Wallet)}}
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