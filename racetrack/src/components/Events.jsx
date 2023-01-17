import { Component } from "react";

class Events extends Component {
    render() {
        return (
            <div className="flex flex-col justify-center items-center bg-nav">
                <div className="text-2xl p-4 text-white">Nadchodzące wydarzenia</div>
                <div className="grid grid-cols-[1fr_5fr_5fr_5fr_5fr_1fr] w-full mb-8">
                    <a href="" className="flex text-white justify-center items-center font-[Calibri] text-[26px]"><span>◄</span></a>
                    <Event />
                    <Event />
                    <Event />
                    <Event />
                    <a href="" className=" flex text-white justify-center items-center font-[Calibri] text-[26px]"><span>►</span></a>
                </div>
            </div>
        )
    }
}

class Event extends Component {
    render() {
        return (
            <div className="first:border-none flex gap-4 py-2 px-8 border-l-2 border-white">
                <div className="w-24 h-24 bg-white rounded"></div>
                <div className="self-center">
                    <div className="text-3xl text-white">01.01.2023</div>
                    <div className="text-2xl text-green">Monza Liga A</div>
                </div>
            </div>

        )
    }
}

export { Events }