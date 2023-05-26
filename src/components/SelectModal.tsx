import { ReactElement, useContext } from "react";
import ethereumTokens, {Token} from "../assets/tokens";
import { GlobalContext } from "../contexts/GLobalContext";

const SelectModal = (): ReactElement=>{

    const {setToken} = useContext(GlobalContext);
    return (
        <div className="w-full md:w-96 text-white text-md border-[1px] border-slate-400 rounded-md">
            <span className="text-lg">Select the token!</span>
            <div className="border-t-[1px] max-h-64 overflow-auto">
                {ethereumTokens.map((token:Token,index:number)=>
                    (
                        <div key={index} className="flex justify-between py-3 px-2 hover:cursor-pointer hover:bg-[#00000091]" onClick={()=>setToken(token.name)}>
                            <span className="inline-flex items-center">{token.name}</span>
                            <img className="w-6 h-auto m-0" src={token.image} alt={"Token logo"}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SelectModal;

