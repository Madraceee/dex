import { useContext, useEffect, useState } from "react";
import { GlobalContext, ModalState } from "../contexts/GLobalContext";
import ModalManager from "./ModalManager";

const Home: React.FC = () =>{

    const {balance,token} = useContext(GlobalContext);

    const [fromAmount,setFromAmount] = useState<string>("");
    const [toAmount,setToAmount] = useState<string>("");
    const [showModal,setShowModal] = useState<ModalState>(ModalState.Null);

    function closeModal(){       
        setShowModal(ModalState.Null);
    }

    useEffect(()=>{
        setShowModal(ModalState.Null);
    },[token])


    return (
        <div>
            <ModalManager 
                state={showModal}
                closeModal={closeModal}
            />
            <div className="w-full h-screen flex items-center">
                <div className="flex flex-col w-3/4 md:w-2/4 lg:w-2/5 mx-auto h-fit bg-[#00000066] px-3 py-2 rounded-md gap-4 text-white text-2xl border-[1px] border-gray-600">
                    <h3 className="">Swap your tokens!!</h3>
                    { balance!== "" && <span className="text-left text-sm">Balance: {balance} MATIC</span>}
                    <div className="rounded-md gap-2 border-[1px] border-gray-600 flex justify-between px-3 py-2">
                        <input className="bg-transparent focus-visible:outline-none w-3/4" value={fromAmount} onChange={(e)=>setFromAmount(e.target.value)} placeholder="0"/>
                        <span>Matic</span>
                    </div>
                    <h3 className="">To</h3>
                    <div className="rounded-md gap-2 border-[1px] border-gray-600 flex justify-between px-3 py-2">
                        <input className="bg-transparent focus-visible:outline-none w-3/4" value={toAmount} onChange={(e)=>setToAmount(e.target.value)} placeholder="0"/>
                        <button onClick={()=>setShowModal(ModalState.Select)} className="text-lg bg-blue-500 px-2 rounded-md hover:scale-110 ease-in-out duration-200">{token}</button>
                    </div>
                    
                    <button className="w-full rounded-sm bg-blue-500 disabled:cursor-not-allowed py-1" disabled={!fromAmount || !toAmount}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
