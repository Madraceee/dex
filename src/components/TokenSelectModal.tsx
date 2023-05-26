import { ReactElement, useContext } from "react";
import ethereumTokens, {Token} from "../assets/tokens";
import { GlobalContext, ModalState, TokenState } from "../context/GlobalContext";

const TokenSelectModal = (): ReactElement=>{

    const {setToToken,setFromToken,tokenState,setOpenModal} = useContext(GlobalContext);
    return (
        <div className="w-full md:w-96 text-white text-md border-slate-400 rounded-md">
            <div className=" max-h-64 overflow-auto">
                {ethereumTokens.map((token:Token,index:number)=>
                    (
                        <div key={index} className="flex justify-between py-3 px-2 hover:cursor-pointer hover:bg-[#00000091]" onClick={()=>{
                                    (tokenState === TokenState.TO? setToToken(token.name) : setFromToken(token.name))
                                    setOpenModal(ModalState.SWAP);
                        }}>
                            <span className="inline-flex items-center">{token.name}</span>
                            <img className="w-6 h-auto m-0 rounded-full" src={token.image} alt={"Token logo"}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default TokenSelectModal;
export const headerSelect: string = "Select Token";

