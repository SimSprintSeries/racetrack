import React from "react";

export const ChangePageButtonLeft = ({disabledVar, onClickFn}) => {
    return (
        <button className='m-auto disabled:opacity-15' onClick={onClickFn} disabled={disabledVar}>
            <svg className='fill-color' xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z"/>
            </svg>
        </button>
    )
}

export const ChangePageButtonRight = ({disabledVar, onClickFn}) => {
    return (
        <button className='m-auto disabled:opacity-15' onClick={onClickFn} disabled={disabledVar}>
            <svg className='rotate-180 fill-color' xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z"/>
            </svg>
        </button>
    )
}