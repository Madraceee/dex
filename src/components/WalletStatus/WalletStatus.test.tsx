import { render } from '@testing-library/react';
import { GlobalContext, WalletState, defaultState } from '../../context/GlobalContext';
import WalletStatus from './WalletStatus';

const formatAddress = (address:string):string =>{
    if(address === ""){
        return "";
    }
    const length = address.length;
    const formattedAddress = address.slice(0,5)+"...."+address.slice(length-4,length-1);
    return formattedAddress;
}

describe("NavBar Wallet Status",()=>{
    it("should render the connect state if wallet not connected",()=>{
        const {getByText} = render(
            <GlobalContext.Provider value={defaultState} >
                <WalletStatus />
            </GlobalContext.Provider>
        );
        const button = getByText("Connect");
        expect(button).toBeInTheDocument();
    });

    it("should render the address if wallet it connected",()=>{
        const newState = defaultState;
        newState.address = "0xBE7ddBcf2F029e03E5E21D0C35c339a7A54603f5";
        newState.walletState = WalletState.CONNECTED;

        const {getByText} = render(
            <GlobalContext.Provider value={newState} >
                <WalletStatus />
            </GlobalContext.Provider>
        );

        const holder = getByText(formatAddress(newState.address));
        expect(holder).toBeInTheDocument();
    })

})