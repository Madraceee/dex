import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export enum WalletState {
    NotConnected,
    Connecting,
    Connected
};

export enum ModalState{
    Null,
    Wallet,
    Select
}

export interface GlobalContextInterface{
    walletState : WalletState,
    openModal : ModalState,    
    address : string,
    balance : string,
    token: string,
    setWalletState : Dispatch<SetStateAction<WalletState>>,
    setOpenModal : Dispatch<SetStateAction<ModalState>>,
    setAddress : Dispatch<SetStateAction<string>>,
    setBalance : Dispatch<SetStateAction<string>>,
    setToken : Dispatch<SetStateAction<string>>
}


const defaultState = {
    walletState : WalletState.NotConnected,
    openModal: ModalState.Null,
    address : "",
    balance: "",
    token: "Select token",
    setWalletState : ( state: WalletState) =>{},
    setOpenModal : ( state: ModalState) =>{},
    setAddress : ( address: string) =>{},
    setBalance : ( balance: string) =>{},
    setToken : ( token: string) =>{}
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
    const [token,setToken] = useState<string>("Select Token");
    
    return(
        <GlobalContext.Provider value={{walletState,openModal,address,balance,token,setWalletState,setOpenModal,setAddress,setBalance,setToken}} >
            {children}
        </GlobalContext.Provider>
    )
}