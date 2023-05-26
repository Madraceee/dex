import { createContext, Dispatch, ReactNode, SetStateAction, useState, useContext } from "react";

export enum WalletState {
    NOTCONNECTED,
    CONNECTING,
    CONNECTED
};

export enum ModalState{
    NULL,
    WALLET,
    TOKENSELECT,
    SWAP
}

export enum TokenState{
    TO,
    FROM
}

export interface GlobalContextInterface{
    walletState : WalletState,
    openModal : ModalState,    
    address : string,
    balance : string,
    toToken: string,
    fromToken: string,
    tokenState: TokenState,
    setWalletState : Dispatch<SetStateAction<WalletState>>,
    setOpenModal : Dispatch<SetStateAction<ModalState>>,
    setAddress : Dispatch<SetStateAction<string>>,
    setBalance : Dispatch<SetStateAction<string>>,
    setToToken : Dispatch<SetStateAction<string>>,
    setFromToken : Dispatch<SetStateAction<string>>,
    setTokenState: Dispatch<SetStateAction<TokenState>>
}

export const defaultState = {
    walletState : WalletState.NOTCONNECTED,
    openModal: ModalState.NULL,
    address : "",
    balance : "",
    toToken : "Select token",
    fromToken : "Matic",
    tokenState : TokenState.TO,
    setWalletState : ( state: WalletState) =>{},
    setOpenModal : ( state: ModalState) =>{},
    setAddress : ( address: string) =>{},
    setBalance : ( balance: string) =>{},
    setToToken : ( token: string) =>{},
    setFromToken : ( token: string) =>{},
    setTokenState : ( token: TokenState) =>{}
} as GlobalContextInterface;

export const GlobalContext = createContext(defaultState);


export default function GlobalProvider({children}: {children: ReactNode}){
    
    const [walletState,setWalletState]  = useState<WalletState>(WalletState.NOTCONNECTED);
    const [openModal,setOpenModal] = useState<ModalState>(ModalState.NULL);
    const [address,setAddress] = useState<string>("");
    const [balance,setBalance] = useState<string>("");
    const [toToken,setToToken] = useState<string>("Select Token");
    const [fromToken,setFromToken] = useState<string>("Matic");
    const [tokenState,setTokenState] = useState<TokenState>(TokenState.TO);
    
    return(
        <GlobalContext.Provider value={{walletState,openModal,address,balance,toToken,fromToken,tokenState,setWalletState,setOpenModal,setAddress,setBalance,setToToken,setFromToken,setTokenState}} >
            {children}
        </GlobalContext.Provider>
    )
}