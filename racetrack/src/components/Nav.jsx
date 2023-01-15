import { Component } from "react";

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.apiTest = this.apiTest.bind(this)
    }

    async apiTest() {
        // const response = await axios.get('http://146.59.34.32:8080/api/oauth2/authorization/discord', {})
        const res = await fetch('http://146.59.34.32:8080/api/oauth2/authorization/discord', {
            credentials: "include",
        })
        // .then((response) => {
        //     console.log(response)
        // //     // window.location.replace(response.url);
        // //     // window.location.href = response.url;
        // //     // window.location.assign(response.url);
        // })
        // console.log(response)
        console.log(res)
        
    }

    urlTest() {
        console.log(window.location.search)
        const url = window.location.search
        const indexOfCode = url.indexOf('code=')
        const indexOfState = url.indexOf('&state=')
        const code = url.slice(indexOfCode + 5, indexOfState)
        const state = url.slice(indexOfState + 7, url.length)
        this.setState({
            code: code,
            state: state
        })
        console.log(code)
        console.log(state)
        console.log(this.state)
        console.log(document.cookie)
    }

    tokenTest() {
        fetch(`http://146.59.34.32:8080/api/login/oauth2/code/discord?code=${this.state.code}&state=${this.state.state}`).then(response => console.log(response), {

        })
    }

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
                <button className="bg-purple-600 w-24 mx-2 hover:bg-purple-500" onClick={() => this.apiTest()}>TEST</button>
                <button className="bg-purple-600 w-24 mx-2 hover:bg-purple-500" onClick={() => this.urlTest()}>URL</button>
                <button className="bg-purple-600 w-24 mx-2 hover:bg-purple-500" onClick={() => this.tokenTest()}>TOKEN</button>
            </header>
        )
    }
}

export { Nav }