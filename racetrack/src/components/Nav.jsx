import logo from '../images/ssslogo.png'
import {NavLink, useLocation, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveUserData, toggleLoginState} from "../store/appSlice.tsx";
import Cookies from 'js-cookie';
import axios from "axios";

const Nav = () => {
    const loginButtonStyle = 'text-color p-4 font-thin hover:bg-color hover:text-green ease-linear lg:text-lg lg:flex lg:items-center lg:justify-center lg:grow duration-100'
    const navButtonStyle = 'text-color text-left font-thin ease-linear duration-100 lg:mx-12 lg:text-lg lg:flex lg:items-center lg:justify-center lg:block p-4 first:mt-4 w-full'
    const [navVisibility, setNavVisibility] = useState(false);
    const [seasonVisibility, setSeasonVisibility] = useState(false)
    const location = useLocation();
    const API_SERVER = useSelector(state => state.storeData.apiServer)

    const dispatch = useDispatch()
    const isUserLogged = useSelector(state => state.storeData.isDiscordLogged)
    const userBasicInfo = useSelector(state => state.storeData.userData)

    const checkUserSession = (token) => {
        if(token !== undefined) {
            dispatch(toggleLoginState(true))

            if (userBasicInfo.id === '') {
            axios.get(API_SERVER + '/user/basic', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
                .then(response => {
                    dispatch(saveUserData({
                        id: response.data.id,
                        username: response.data.username,
                        displayName: response.data.displayName,
                        avatar: response.data.avatar,
                        driverId: response.data.driverId,
                        isAdmin: response.data.isAdmin
                    }))
                })
                .catch(ex => console.log(ex)) }
        } else {
            dispatch(toggleLoginState(false))
        }
    }


    useEffect(() => {
        if(navVisibility) {
            switchNavVisibility();
            switchSeasonVisibility();
        }
        checkUserSession(Cookies.get('token'))
    }, [location])

    async function onSubmit() {
        try {
            window.location.href =
                API_SERVER + "/oauth2/authorization/discord";
        } catch (error) {
            console.log(error)
        }
    }

    const logOut = () => {
        axios.post(API_SERVER + '/login/oauth2/code/discord/revoke', null, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            params: {
                token: Cookies.get('token')
            }
        })
            .then(response => {
                if(response.request.status === 204) {
                    Cookies.remove('token', {path: '/'})
                    window.location.href = "/"
                }
            })
            .catch(ex => console.log(ex))
    }


    function displayLoginLogout() {
        if (isUserLogged) {
            return <button className={loginButtonStyle} onClick={() => logOut()}>WYLOGUJ</button>
        } else {
            return <button className={loginButtonStyle} onClick={() => onSubmit()}>ZALOGUJ</button>
        }
    }

    const switchNavVisibility = () => {
        setNavVisibility(!navVisibility);
        if(!navVisibility) {
            setSeasonVisibility(false)
        }
    }

    const switchSeasonVisibility = () => {
        setSeasonVisibility(!seasonVisibility)
        console.log(seasonVisibility)
    }

    return (
        <header id='section0' className="flex p-4 place-items-center gap-4">
            <NavLink to="/"><img src={logo} alt="sim sprint series logo" className="flex lg:w-full mix-blend-screen"/></NavLink>
            <button onClick={() => switchNavVisibility()} className='text-color z-50 text-4xl lg:hidden '>
                <div className='flex flex-col gap-1 w-[0.75em]'>
                    <div className={`w-[.75em] bg-color h-0.5 ease-linear duration-100 ` + `${navVisibility ? 'w-[.75em] translate-y-[0.188rem] rotate-45' : null}`}></div>
                    <div className={`w-[.75em] bg-color h-0.5 ` + `${navVisibility ? 'hidden' : null}`}></div>
                    <div className={`w-[.75em] bg-color h-0.5 ease-linear duration-100 ` + `${navVisibility ? 'w-[.75em] -translate-y-[0.187rem] -rotate-45' : null}`}></div>
                </div>
            </button>
            <nav className={'flex flex-col flex-grow-1 lg:flex-row fixed lg:static right-0 top-0 bg-nav/95 lg:bg-nav/0 box-content h-full z-40 ease-linear backdrop-blur-sm duration-100 overflow-hidden ' + `${navVisibility ? 'pl-4 pr-16 lg:w-full lg:pl-0 lg:pr-0' : 'w-0 lg:w-full'}`}>

                <div>
                    <button onClick={() => switchSeasonVisibility()} className={navButtonStyle + `${seasonVisibility ? ' bg-color/15 w-full rounded-lg' : ''}`}>SEZONY</button>
                    <div className={'flex flex-col ml-4 ease-linear duration-100 overflow-hidden ' + `${seasonVisibility ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
                        <Link to='/events/activeSeasons' className={navButtonStyle}>Aktualne Sezony</Link>
                        <Link to='/events/archiveSeasons' className={navButtonStyle}>Archiwalne Sezony</Link>
                    </div>
                </div>

                <a href='https://discord.com/invite/gVHE7Sf' target='_blank' className={navButtonStyle}>DISCORD</a>

                <NavLink to="/stats" className={navButtonStyle} >STATYSTYKI</NavLink>

                <NavLink to="/" className={navButtonStyle} >AKTUALNOŚCI</NavLink>

                {isUserLogged ? <NavLink to="/driver" className={navButtonStyle + ' flex gap-x-4 items-center justify-start'}>
                    <div className='relative'>
                        <img className='w-7 h-7 rounded-full' src={`https://cdn.discordapp.com/avatars/${userBasicInfo.id}/${userBasicInfo.avatar}.png?size=160`} alt=""/>
                    </div>{userBasicInfo.username.toUpperCase()}</NavLink> : null}

                {userBasicInfo.isAdmin ? <NavLink to='/admin' className={navButtonStyle}>PANEL ADMINISTRACYJNY</NavLink> : null}

                <div className='lg:flex  '>{displayLoginLogout()}</div>
            </nav>
        </header>)
}

export { Nav }