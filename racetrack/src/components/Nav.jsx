import { useSignOut, useIsAuthenticated } from "react-auth-kit"
import logo from '../images/ssslogo.png'
import {NavLink} from "react-router-dom";

const Nav = props => {
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()
    const loginButtonStyle = 'text-color border-[1px] border-white rounded-[25px] px-12 py-2 font-thin hover:bg-color hover:text-green ease-linear duration-100 hidden lg:block'
    const navButtonStyle = 'text-color text-center font-thin hover:-translate-y-1 ease-linear duration-100 hidden lg:block'

    async function onSubmit() {
        try {
            window.location.href =
              "http://57.128.195.196:8080/api/login/oauth2/code/discord";
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
        <header id='section0' className="h-[150px] grid lg:grid-cols-[2fr_3fr] place-items-center">
            <NavLink to="/"><img src={logo} alt="sim sprint series logo" className="w-[675px] mix-blend-screen"/></NavLink>
            <nav className='grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr] text-[20px] place-items-center w-full'>
                <NavLink to="/events" className={navButtonStyle}>EVENTY</NavLink>
                <a href='https://discord.com/invite/gVHE7Sf' target='_blank' className={navButtonStyle}>DISCORD</a>
                <NavLink to="/stats" className={navButtonStyle} >STATYSTYKI</NavLink>
                <NavLink to="/driver" className={navButtonStyle}>PANEL KIEROWCY</NavLink>
                <div>{displayLoginLogout()}</div>
            </nav>
        </header>)
}

export { Nav }