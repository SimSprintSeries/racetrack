import { Component } from "react";
import logo from '../images/ssslogo.png'

class LogoBar extends Component {
    render() {
        return (
            <div className="bg-bg h-64 flex justify-center items-center">
                <img src={logo} alt="sim sprint series logo" className="w-[700px]"/>
            </div>
        )
    }
}

export { LogoBar }