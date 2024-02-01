import logo from '../images/ssslogo.png'
import {NavLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveUserData, toggleLoginState} from "../store/appSlice.tsx";
import Cookies from 'js-cookie';
import axios from "axios";

const Nav = () => {
    const loginButtonStyle = 'text-color p-4 font-thin hover:bg-color hover:text-green ease-linear lg:text-lg lg:flex lg:items-center lg:justify-center lg:grow duration-100'
    const navButtonStyle = 'text-color text-left font-thin hover:-translate-y-1 ease-linear duration-100 lg:mx-12 lg:text-lg lg:flex lg:items-center lg:justify-center lg:block p-4'
    const [navVisibility, setNavVisibility] = useState(false);
    const location = useLocation();
    const API_SERVER = useSelector(state => state.storeData.apiServer)

    const dispatch = useDispatch()
    const isUserLogged = useSelector(state => state.storeData.isDiscordLogged)
    const userBasicInfo = useSelector(state => state.storeData.userData)

    const checkUserSession = (token) => {
        if(token !== undefined) {
            dispatch(toggleLoginState(true))

            axios.get(API_SERVER + '/user/basic', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
                .then(response => dispatch(saveUserData({
                    id: response.data.id,
                    username: response.data.username,
                    displayName: response.data.displayName,
                    avatar: response.data.avatar
                })))
                .catch(ex => console.log(ex))
        } else {
            dispatch(toggleLoginState(false))
        }
    }


    useEffect(() => {
        if(navVisibility) {
            switchNavVisibility();
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
    }

    return (
        <header id='section0' className="flex p-4 place-items-center gap-4">
            <NavLink to="/"><img src={logo} alt="sim sprint series logo" className="flex lg:w-full mix-blend-screen"/></NavLink>
            <button onClick={() => switchNavVisibility()} className='text-color z-50 text-4xl lg:hidden'><div className='flex flex-col gap-1'><div className='w-[.75em] bg-color h-0.5'></div><div className='w-[.75em] bg-color h-0.5'></div><div className='w-[.75em] bg-color h-0.5'></div></div></button>
            <nav className={'flex flex-col flex-grow-1 lg:flex-row fixed lg:static right-0 top-0 bg-nav/95 lg:bg-nav/0 box-content h-full z-40 ease-linear duration-100 overflow-hidden ' + `${navVisibility ? 'pl-4 pr-16 lg:w-full lg:pl-0 lg:pr-0' : 'w-0 lg:w-full'}`}>
                <NavLink to="/events" className={navButtonStyle}>SEZONY</NavLink>
                <a href='https://discord.com/invite/gVHE7Sf' target='_blank' className={navButtonStyle}>DISCORD</a>
                <NavLink to="/stats" className={navButtonStyle} >STATYSTYKI</NavLink>
                <NavLink to="/" className={navButtonStyle} >AKTUALNOŚCI</NavLink>
                {isUserLogged ? <NavLink to="/driver" className={navButtonStyle + ' flex gap-x-4 items-center justify-start'}><div className='relative'><img className='w-7 h-7 rounded-full' src={`https://cdn.discordapp.com/avatars/${userBasicInfo.id}/${userBasicInfo.avatar}`} alt=""/></div>{userBasicInfo.username.toUpperCase()}</NavLink> : null}
                <div className='lg:flex  '>{displayLoginLogout()}</div>
            </nav>
        </header>)
}

export { Nav }