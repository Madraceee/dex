import {ReactElement, useContext} from "react";
import WalletModal,{headerWallet} from "./WalletModal";
import SelectModal,{headerSelect} from "./SelectModal";
import Swap,{headerSwap} from "./SwapModal";
import { GlobalContext, ModalState } from "../contexts/GLobalContext";
import Dialog from "./Dialog";


const ModalManager = (): ReactElement => {

    const {openModal,setOpenModal} = useContext(GlobalContext);

    const closeOnOuterClick = ()=>{
        setOpenModal(ModalState.Null);
    }

    const closeOnOuterClickSelect = ()=>{
        setOpenModal(ModalState.Swap);
    }

    return (
        <div>            
            <Dialog
                isOpen={openModal === ModalState.Wallet ? true : false}
                children={WalletModal()}
                closeOnOuterClick={closeOnOuterClick}
                header={headerWallet}
            />
            <Dialog
                isOpen={openModal === ModalState.Select? true : false}
                children={SelectModal()}
                closeOnOuterClick={closeOnOuterClickSelect}
                header={headerSelect}
            />
            <Dialog
                isOpen={openModal === ModalState.Swap? true : false}
                children={Swap()}
                closeOnOuterClick={closeOnOuterClick}
                header={headerSwap}
            />
        </div>
    );
}


export default ModalManager;