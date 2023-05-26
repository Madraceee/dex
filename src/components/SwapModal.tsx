import { useContext,useState } from "react";
import { GlobalContext, ModalState, TokenState } from "../context/GlobalContext";

const Swap = ()=>{
    const {balance,toToken,fromToken,setOpenModal,setTokenState} = useContext(GlobalContext);

    const [fromAmount,setFromAmount] = useState<string>("");
    const [toAmount,setToAmount] = useState<string>("");



    return (
    <div>
        <div className="flex flex-col mx-auto h-fit  px-3 py-2 rounded-md gap-4 text-gray-300 text-2xl">            
            <div className=" relative flex gap-2 flex-col">

                <div className="rounded-md gap-2 flex justify-between flex-col px-3 py-2 bg-gray-900">
                    <div className="flex justify-between pt-2">
                        <input className="bg-transparent focus-visible:outline-none w-3/5" value={fromAmount} onChange={(e)=>setFromAmount(e.target.value)} placeholder="0"/>
                        <button onClick={()=>{setTokenState(TokenState.FROM);setOpenModal(ModalState.TOKENSELECT)}} 
                                className="text-lg text-white bg-blue-500 px-2 rounded-md opacity-80 hover:opacity-100 ease-in-out duration-100"
                        >
                                {fromToken}
                        </button>
                    </div>                
                    <span className="text-right text-sm">Balance: {balance}</span>
                </div>

                <span className="absolute h-9 leading-none w-9 align-middle top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#0d111c] rounded-md bg-gray-900 px-1 pb-1">&#x2193;</span>

                <div className="rounded-md gap-2 flex justify-between flex-col px-3 py-2 bg-gray-900">
                    <div className="flex justify-between pt-2">
                        <input className="bg-transparent focus-visible:outline-none w-3/5" value={toAmount} onChange={(e)=>setToAmount(e.target.value)} placeholder="0"/>
                        <button onClick={()=>{setTokenState(TokenState.TO); setOpenModal(ModalState.TOKENSELECT)}} 
                                className="text-lg text-white bg-blue-500 px-2 rounded-md opacity-80 hover:opacity-100 ease-in-out duration-100"
                        >
                            {toToken}
                        </button>
                    </div>
                    <span className="text-right text-sm opacity-0">Balance: {balance}</span>
                </div>

            </div>         
            <button className="w-full rounded-md bg-blue-500 disabled:cursor-not-allowed py-1 font-semibold" disabled={!fromAmount || !toAmount}>Submit</button>
        </div>
    </div>
  );
}

export default Swap;
export const headerSwap: string = "Swap";