import { Component } from "react";

class Events extends Component {
    render() {
        return (
            <div className="flex flex-col justify-center items-center bg-bg">
                <div className="text-2xl p-4">Nadchodzące wydarzenia</div>
                <div className="flex mb-8">
                    <Event />
                    <Event />
                    <Event />
                    <Event />
                </div>
            </div>
        )
    }
}

class Event extends Component {
    render() {
        return (
            <div className="first:border-none flex gap-4 py-2 px-8 border-l-2 border-black">
                <div className="w-24 h-24 bg-zinc-900"></div>
                <div className="self-center">
                    <div className="text-3xl">01.01.2023</div>
                    <div className="text-2xl">Monza Liga A</div>
                </div>
            </div>

        )
    }
}

export { Events }