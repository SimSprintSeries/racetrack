import { Component } from "react";

class Nav extends Component {
    render() {
        return (
            <header className="h-12 flex justify-center items-center bg-zinc-800">
                <nav>
                    <a href="" className="text-white px-4 py-1 border-l-2">GŁÓWNA</a>
                    <a href="" className="text-white px-4 py-1 border-l-2">EVENTY</a>
                    <a href="" className="text-white px-4 py-1 border-2 rounded">PANEL KIEROWCY</a>
                    <a href="" className="text-white px-4 py-1 border-r-2">DISCORD</a>
                    <a href="" className="text-white px-4 py-1 border-r-2">KONTAKT</a>
                </nav>
            </header>
        )
    }
}

export { Nav }