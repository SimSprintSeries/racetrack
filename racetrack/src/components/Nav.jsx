import { useSignOut, useIsAuthenticated } from "react-auth-kit"
import logo from '../images/ssslogo.png'
import {NavLink} from "react-router-dom";

function Nav(props) {
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()
    const loginButtonStyle = 'text-color border-[1px] border-white rounded-[25px] px-12 py-2 font-thin hover:bg-color hover:text-green ease-linear duration-100'
    const navButtonStyle = 'text-color text-center font-thin hover:-translate-y-1 ease-linear duration-100'

    async function onSubmit() {
        try {
            window.location.href =
              "http://146.59.34.32:8080/api/oauth2/authorization/discord";
        } catch (error) {
            console.log(error)
        }
    }

    function displayLoginLogout() {
        if (isAuthenticated()) {
            return <button className={loginButtonStyle} onClick={() => signOut()}>WYLOGUJ</button>
        } else {
            return <button className={loginButtonStyle} onClick={() => onSubmit()}>ZALOGUJ</button>
        }
    }

    return (
        <header id='section0' className="h-[150px] grid grid-cols-[2fr_3fr] place-items-center">
            <NavLink to="/"><img src={logo} alt="sim sprint series logo" className="w-[675px] mix-blend-screen"/></NavLink>
            <nav className='grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr] text-[20px] place-items-center w-full'>
                <NavLink to="" className={navButtonStyle}>EVENTY</NavLink>
                <NavLink to="discord" className={navButtonStyle}>DISCORD</NavLink>
                <NavLink to="" className={navButtonStyle} >STATYSTYKI</NavLink>
                <NavLink to="" className={navButtonStyle}>PANEL KIEROWCY</NavLink>
                <div>{displayLoginLogout()}</div>
            </nav>
        </header>)
}

export { Nav }