import { useContext, useEffect } from "react";
import { GlobalContext, ModalState, WalletState } from "../contexts/GLobalContext";
import ModalManager from "./ModalManager";

const Home: React.FC = () =>{

    const {address,setOpenModal,setWalletState,setAddress,setBalance} = useContext(GlobalContext);

    const handleAccountChange = (e:any) => {
    
        if(e[0] && address===""){
            return;
        }
        if(e[0]!==address){  
            setOpenModal(ModalState.Null);       
            setWalletState(WalletState.NotConnected);
            setAddress("");
            setBalance("");
        }    
    };

    useEffect(() => {       

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
        <div className="w-full h-screen flex justify-center items-center">
            <ModalManager />
            {address!== "" && 
                (
                    <button className="text-lg text-white font-semibold w-48 h-12 bg-blue-500 px-2 rounded-md opacity-80 hover:scale-110 hover:opacity-100 ease-in-out duration-200" 
                            onClick={()=>setOpenModal(ModalState.Swap)}
                    >Show Modal
                    </button>
                )
            }
        </div>
    );
}

export default Home;
