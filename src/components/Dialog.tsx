import React, { ReactElement, useEffect, useRef } from 'react'
import { concatClasses } from '../utils/helpers';
import "./Dialog.css";

const Dialog = ({
    isOpen,
    children,
    closeOnOuterClick,
}: {
    isOpen: boolean
    children: ReactElement,
    closeOnOuterClick?: () => void
}) => {
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
            onClick={closeOnOuterClick}
            ref={bgRef}
            className={concatClasses([
                'fixed overflow-y-auto bg-black/50 top-0 left-0 right-0 bottom-0 z-20 h-full w-full flex items-center justify-center backdrop-blur-sm',
                isOpen ? ' dialog-bg-in' : '  dialog-bg-out ',
            ])}
        >
            <div className='bg-[#000000ca] h-fit max-h-96 px-2 py-2 rounded-md w-full sm:w-fit z-50' onClick={(event)=>event.stopPropagation()}>
                <div className='w-full block text-right text-white'><span className='hover:cursor-pointer' onClick={closeOnOuterClick}>X</span></div>
                {React.cloneElement(children, {
                    className:
                        children.props.className +
                        (isOpen ? ' dialog-in' : ' dialog-out'),
                })}
            </div>
            
        </div>
    )
}

export default Dialog