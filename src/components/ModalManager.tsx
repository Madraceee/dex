import {ReactElement} from "react";
import WalletModal from "./WalletModal";
import SelectModal from "./SelectModal";
import { ModalState } from "../contexts/GLobalContext";
import Dialog from "./Dialog";

interface Props{
    state: ModalState,
    closeModal: ()=>void
}

const ModalManager = (props: Props): ReactElement => {

    return (
        <div>            
            <Dialog
                isOpen={props.state === ModalState.Wallet ? true : false}
                children={WalletModal()}
                closeOnOuterClick={props.closeModal}
            />
            <Dialog
                isOpen={props.state === ModalState.Select? true : false}
                children={SelectModal()}
                closeOnOuterClick={props.closeModal}
            />
        </div>
    );
}


export default ModalManager;