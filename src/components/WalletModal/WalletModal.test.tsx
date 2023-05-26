import { fireEvent, render } from '@testing-library/react';
import { GlobalContext, ModalState, WalletState, defaultState } from '../../context/GlobalContext';
import WalletModal from './WalletModal';

describe('Testing WalletModal', () => {

    it("Should contain Connect to Metamask Button",()=>{

        const {getByText} = render(
            <GlobalContext.Provider value={defaultState} >
                    <WalletModal />
            </GlobalContext.Provider>
        );

        const button = getByText("Connect To Metamask");
        expect(button).toBeInTheDocument();        
    });

    it("Should render a loader while connecting to wallet",async ()=>{
        const newState = defaultState;
        newState.walletState = WalletState.CONNECTING;
        const {findAllByTestId} = render(
            <GlobalContext.Provider value={newState} >
                    <WalletModal />
            </GlobalContext.Provider>
        );

        const loaders = await findAllByTestId("loader")

        loaders.forEach(loader=>{
            if(loader.classList.contains("loader")){
                expect(loader).toBeInTheDocument();
            }})
    });
})
