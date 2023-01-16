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
            return <button className="text-white px-4 py-1 border-r-2" onClick={() => signOut()}>WYLOGUJ</button>
        } else {
            return <button className="text-white px-4 py-1 border-r-2" onClick={() => onSubmit()}>ZALOGUJ</button>
        }
    }

    return (
        <header className="h-12 flex justify-center items-center bg-nav">
            <nav>
                <a href="" className="text-white px-4 py-1 border-l-2">GŁÓWNA</a>
                <a href="" className="text-white px-4 py-1 border-l-2">EVENTY</a>
                <a href="" className="text-white px-4 py-1 border-l-2">DISCORD</a>
                <a href="" className="text-white px-4 py-1 border-2 rounded">PANEL KIEROWCY</a>
                <a href="" className="text-white px-4 py-1 border-r-2">STATYSTYKI</a>
                <a href="" className="text-white px-4 py-1 border-r-2">KONTAKT</a>
                {displayLoginLogout()}
            </nav>
        </header>)
};

export { Nav }