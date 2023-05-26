import { useContext, useEffect } from "react";
import { GlobalContext, ModalState, WalletState } from "../context/GlobalContext";
import ModalManager from "./ModalManager";
import { ethers } from "ethers";

const Home: React.FC = () =>{

    const {address,setOpenModal,setWalletState,setAddress,setBalance} = useContext(GlobalContext);

    const handleAccountChange = (e:string[]) => {
        if(e[0] && address==="") return;
        
        if(e[0]!==address){  
            setOpenModal(ModalState.NULL);       
            setWalletState(WalletState.NOTCONNECTED);
            setAddress("");
            setBalance("");
        }    
    };

    const getBalance = async (acount: string)=>{
        const provider: ethers.providers.Web3Provider | null = new ethers.providers.Web3Provider(window.ethereum,"any");
        const balance = await provider.getBalance(acount);
        setBalance(ethers.utils.formatEther(balance));
    }

    useEffect(() => {       
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountChange);
        }

        if(window.ethereum){
            window.ethereum.request({method: "eth_accounts"},[])
                .then((accouts:string[]) =>{
                    if(accouts[0]){
                        setAddress(accouts[0]);
                        setOpenModal(ModalState.NULL);
                        setWalletState(WalletState.CONNECTED);
                        getBalance(accouts[0]);
                    }
                });

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
                            onClick={()=>setOpenModal(ModalState.SWAP)}
                    >Show Modal
                    </button>
                )
            }
        </div>
    );
}

export default Home;
