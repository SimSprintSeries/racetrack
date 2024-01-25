import {useSignOut, useIsAuthenticated} from "react-auth-kit"
import logo from '../images/ssslogo.png'
import {NavLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const Nav = () => {
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()
    const loginButtonStyle = 'text-color px-12 py-4 font-thin hover:bg-color hover:text-green ease-linear duration-100'
    const navButtonStyle = 'text-color text-center font-thin hover:-translate-y-1 ease-linear duration-100 lg:block p-4'

    const [navVisibility, setNavVisibility] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if(navVisibility) {
            switchNavVisibility();
        }
    }, [location])

    async function onSubmit() {
        try {
            window.location.href =
              "http://57.128.195.196:8080/api/oauth2/authorization/discord";
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

    const switchNavVisibility = () => {
        setNavVisibility(!navVisibility);
    }

    return (
        <header id='section0' className="flex p-4 place-items-center gap-4">
            <NavLink to="/"><img src={logo} alt="sim sprint series logo" className="flex lg:w-[675px] mix-blend-screen"/></NavLink>
            <button onClick={() => switchNavVisibility()} className='text-color z-50 text-4xl'><div className='flex flex-col gap-1'><div className='w-[.75em] bg-color h-0.5'></div><div className='w-[.75em] bg-color h-0.5'></div><div className='w-[.75em] bg-color h-0.5'></div></div></button>
            <nav className={'flex flex-col flex-grow-1 lg:flex-row fixed right-0 top-0 bg-nav box-content h-full z-40 ease-linear duration-100 overflow-hidden ' + `${navVisibility ? 'pl-4 pr-16' : 'w-0'}`}>
                <NavLink to="/events" className={navButtonStyle}>SEZONY</NavLink>
                <a href='https://discord.com/invite/gVHE7Sf' target='_blank' className={navButtonStyle}>DISCORD</a>
                <NavLink to="/stats" className={navButtonStyle} >STATYSTYKI</NavLink>
                <NavLink to="/" className={navButtonStyle} >AKTUALNOŚCI</NavLink>
                <NavLink to="/driver" className={navButtonStyle}>PANEL KIEROWCY</NavLink>
                <div className='justify-center'>{displayLoginLogout()}</div>
            </nav>
        </header>)
}

export { Nav }