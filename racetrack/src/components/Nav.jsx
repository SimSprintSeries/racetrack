import { useSignOut, useIsAuthenticated } from "react-auth-kit"

function Nav(props) {
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()

    async function onSubmit() {
        try {
            const res = await fetch('http://146.59.34.32:8080/api/oauth2/authorization/discord')
            window.location.href = res.url
        } catch (error) {
            console.log(error)
        }
    }

    function displayLoginLogout() {
        if (isAuthenticated()) {
            return <button className="text-white px-4 py-1" onClick={() => signOut()}>WYLOGUJ</button>
        } else {
            return <button className="text-white px-4 py-1" onClick={() => onSubmit()}>ZALOGUJ</button>
        }
    }

    return (
        <header className="h-12 flex justify-center items-center bg-nav">
            <nav>
                <a href="" className="text-white px-10 py-1">GŁÓWNA</a>
                <a href="" className="text-white px-10 py-1">EVENTY</a>
                <a href="" className="text-white px-10 py-1">DISCORD</a>
                <a href="" className="text-white px-7 py-4 bg-green rounded-lg">PANEL KIEROWCY</a>
                <a href="" className="text-white px-10 py-1">STATYSTYKI</a>
                <a href="" className="text-white px-10 py-1">KONTAKT</a>
                {displayLoginLogout()}
            </nav>
        </header>)
}

export { Nav }