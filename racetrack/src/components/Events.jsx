import { Component } from "react";

class Events extends Component {
    render() {
        return (
            <div className="flex flex-col justify-center items-center w-[40%] font-thin">
                <Event/>
                <LastEvent/>
            </div>
        )
    }
}

const Event = () => {
    return (
        <><div className="text-2xl p-4 pb-12 text-color">Najbliższe wydarzenie</div>
            <div className="flex w-full items-center justify-center">
                <div className=''><div className='bg-bg w-[190px] h-[190px] text-color grid place-content-center rounded-[5px] self-center mr-9'>F1 22 Liga A</div></div>
                <a href="" className="grid place-content-center text-[24px] text-color w-1/4">Monza 25.01.2023 20:10</a>
            </div></>
    )
}

const LastEvent = () => {
    return (
        <><div className="text-2xl p-16 pb-12 text-color">Ostatnia transmisja</div>
            <div className="flex w-full items-center justify-center">
                <div className=''><div className='bg-bg w-[190px] h-[190px] text-color grid place-content-center rounded-[5px] self-center mr-9'>F1 22 Liga A</div></div>
                <a href="" className="grid place-content-center text-[24px] text-color w-1/4">Monza 25.01.2023 20:10</a>
            </div></>
    )
}

export { Events }