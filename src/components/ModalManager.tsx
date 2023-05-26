import {ReactElement, useContext} from "react";
import WalletModal,{headerWallet} from "./WalletModal/WalletModal";
import TokenSelectModal,{headerSelect} from "./TokenSelectModal";
import Swap,{headerSwap} from "./SwapModal";
import { GlobalContext, ModalState } from "../context/GlobalContext";
import Modal from "./Modal/Modal";


const ModalManager = (): ReactElement => {

    const {openModal,setOpenModal} = useContext(GlobalContext);

    const handleOuterClick = ()=>{
        setOpenModal(ModalState.NULL);
    }

    const handleOutClickOnTokenSelect = ()=>{
        setOpenModal(ModalState.SWAP);
    }

    return (
        <>            
            <Modal
                isOpen={openModal === ModalState.WALLET ? true : false}
                children={WalletModal()}
                closeOnOuterClick={handleOuterClick}
                header={headerWallet}
            />
            <Modal
                isOpen={openModal === ModalState.TOKENSELECT? true : false}
                children={TokenSelectModal()}
                closeOnOuterClick={handleOutClickOnTokenSelect}
                header={headerSelect}
            />
            <Modal
                isOpen={openModal === ModalState.SWAP? true : false}
                children={Swap()}
                closeOnOuterClick={handleOuterClick}
                header={headerSwap}
            />
        </>
    );
}


export default ModalManager;