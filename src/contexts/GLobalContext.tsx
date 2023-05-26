import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export enum WalletState {
    NotConnected,
    Connecting,
    Connected
};

export enum ModalState{
    Null,
    Wallet,
    Select,
    Swap
}

export enum TokenState{
    To,
    From
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


const defaultState = {
    walletState : WalletState.NotConnected,
    openModal: ModalState.Null,
    address : "",
    balance : "",
    toToken : "Select token",
    fromToken : "Select token",
    tokenState : TokenState.To,
    setWalletState : ( state: WalletState) =>{},
    setOpenModal : ( state: ModalState) =>{},
    setAddress : ( address: string) =>{},
    setBalance : ( balance: string) =>{},
    setToToken : ( token: string) =>{},
    setFromToken : ( token: string) =>{},
    setTokenState : ( token: TokenState) =>{}
} as GlobalContextInterface;

export const GlobalContext = createContext(defaultState);

type GlobalContextProps = {
    children : ReactNode
};

export default function GlobalProvider({children}: GlobalContextProps){
    
    const [walletState,setWalletState]  = useState<WalletState>(WalletState.NotConnected);
    const [openModal,setOpenModal] = useState<ModalState>(ModalState.Null);
    const [address,setAddress] = useState<string>("");
    const [balance,setBalance] = useState<string>("");
    const [toToken,setToToken] = useState<string>("Select Token");
    const [fromToken,setFromToken] = useState<string>("Select Token");
    const [tokenState,setTokenState] = useState<TokenState>(TokenState.To);
    
    return(
        <GlobalContext.Provider value={{walletState,openModal,address,balance,toToken,fromToken,tokenState,setWalletState,setOpenModal,setAddress,setBalance,setToToken,setFromToken,setTokenState}} >
            {children}
        </GlobalContext.Provider>
    )
}