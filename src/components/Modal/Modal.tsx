import React, { ReactElement, useContext, useEffect, useRef } from 'react'
import { concatClasses } from '../../utils/helpers';
import "./Modal.css";
import { GlobalContext, ModalState } from '../../context/GlobalContext';

const Modal = ({
    isOpen,
    children,
    header,
    closeOnOuterClick    
}: {
    isOpen: boolean
    children: ReactElement,
    header: string,
    closeOnOuterClick?: () => void
}) => {

    const {setOpenModal} = useContext(GlobalContext);
    const bgRef = useRef<HTMLDivElement>(null)

    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current && !isOpen) {
            bgRef.current?.classList?.add('hidden')
            firstRender.current = false
            return
        }
        if (!isOpen) {
            setTimeout(() => {
                bgRef.current?.classList?.add('hidden')
            }, 150)
        } else {
            bgRef.current?.classList?.remove('hidden')
        }
    }, [isOpen])

    return (
        <div
            onClick={()=>setOpenModal(ModalState.NULL)}
            ref={bgRef}
            className={concatClasses([
                'fixed overflow-y-auto bg-black/50 top-0 left-0 right-0 bottom-0 z-20 h-full w-full flex items-center justify-center backdrop-blur-sm',
                isOpen ? ' dialog-bg-in' : '  dialog-bg-out ',
            ])}
        >
            <div className='bg-[#0d111c] h-fit max-h-96  rounded-md w-full sm:w-fit lg:w-fit lg:max-w-2xl z-50 border border-dialogBorder shadow-dialogBox' onClick={(event)=>event.stopPropagation()}>
                <div className='w-full p-4 flex justify-between text-white mb-2 border-b border-dialogBorder'>
                    <span className='text-xl'>{header}</span>
                    <span className='hover:cursor-pointer flex items-center justify-center' onClick={closeOnOuterClick}><img className='w-4 h-4' src="/close.png" alt="Close" /></span>
                </div>
                {React.cloneElement(children, {
                    className:
                        children.props.className +
                        (isOpen ? ' dialog-in' : ' dialog-out'),
                })}
            </div>
            
        </div>
    )
}

export default Modal