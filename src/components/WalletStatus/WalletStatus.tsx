import { useContext } from "react";
import {GlobalContext, ModalState, WalletState } from "../../context/GlobalContext";

const WalletStatus =  () => {

    const {walletState,address,setOpenModal} = useContext(GlobalContext);

    const formatAddress = ():string =>{
        if(address === ""){
            return "";
        }
        const length = address.length;
        const formattedAddress = address.slice(0,5)+"...."+address.slice(length-4,length-1);
        return formattedAddress;
    }

    return (
        <>
            { walletState === WalletState.CONNECTED ?
                (
                    <div className="px-4 py-2 bg-[#12121297] rounded-md font-semibold">
                        {formatAddress()}
                    </div>
                ):
                (
                    <button 
                        className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-md opacity-80 hover:scale-110 hover:opacity-100 ease-in-out duration-200"
                        onClick={()=>{setOpenModal(ModalState.WALLET)}}
                    >
                        Connect
                    </button>
                ) 

            }
        </>
    );
}

export default WalletStatus;