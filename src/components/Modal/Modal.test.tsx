import { fireEvent, render } from '@testing-library/react';
import { GlobalContext, ModalState, defaultState } from '../../context/GlobalContext';
import Modal from './Modal';
import { ReactElement } from 'react';

describe('Testing Modal', () => {
    it("should hide modal when X is clicked",()=>{
        const buttonClick = jest.fn();
        const newState = defaultState;
        newState.openModal = ModalState.WALLET;
        
        const {getByAltText} = render(
            <GlobalContext.Provider value={newState} >
                <Modal 
                    isOpen={newState.openModal === ModalState.WALLET ? true: false}
                    children={(<h1>Hi</h1>) as ReactElement}
                    header={"Testing"}
                    closeOnOuterClick={buttonClick}
                />
            </GlobalContext.Provider>
        );

        const button = getByAltText("Close").parentElement;
        if(button)
            fireEvent.click(button);

        expect(buttonClick).toHaveBeenCalled()


    })
})
