import logo from '../images/ssslogo.png'
import {NavLink, useLocation, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveUserData, toggleLoginState} from "../store/appSlice.tsx";
import Cookies from 'js-cookie';
import axios from "axios";

const Nav = () => {
    const navButtonStyle = 'text-color font-thin ml-4 lg:ml-0 xl:ml-4 px-4 py-2 text-base lg:text-xs xl:text-sm 2xl:text-base lg:first:ml-12 ease-linear duration-100 lg:hover:-translate-y-0.5 w-full lg:w-auto text-left lg:flex lg:justify-center lg:items-center'
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
                        isAdmin: response.data.isAdmin,
                        isSteward: response.data.isSteward
                    }))
                })
                .catch(ex => {
                    console.log(ex)
                    Cookies.remove('token', {path: '/'})
                }) }
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
            return <button className={navButtonStyle + ' flex gap-x-4 items-center'} onClick={() => logOut()}><svg xmlns="http://www.w3.org/2000/svg" className='fill-color w-[1.2rem] rotate-180' viewBox="0 0 512 512"><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
            </svg>WYLOGUJ</button>
        } else {
            return <button className={navButtonStyle + ' flex gap-x-4 items-center'} onClick={() => onSubmit()}><svg xmlns="http://www.w3.org/2000/svg" className='fill-color w-[1.2rem]' viewBox="0 0 512 512"><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
            </svg>ZALOGUJ</button>
        }
    }

    const switchNavVisibility = () => {
        setNavVisibility(!navVisibility);
        if(!navVisibility) {
            setSeasonVisibility(false)
        }
    }


    function checkSeasonMenuClick(e) {
            if(document.getElementById('seasonMenu').contains(e.target) || document.getElementById('seasonButton').contains(e.target)) {
            } else {
                window.removeEventListener('click', checkSeasonMenuClick)
                setSeasonVisibility(false)
            }
    }

    const switchSeasonVisibility = () => {
        setSeasonVisibility(!seasonVisibility)
        if(!seasonVisibility === true) {
            window.addEventListener('click', checkSeasonMenuClick)
        }
    }

    return (
        <header id='section0' className="flex p-4 place-items-center gap-4 ">
            <NavLink to="/"><img src={logo} alt="sim sprint series logo" className="flex lg:w-full lg:min-w-[300px] mix-blend-screen"/></NavLink>
            <button onClick={() => switchNavVisibility()} className='text-color z-50 text-4xl h-[2rem] lg:hidden '>
                <div className='flex flex-col gap-1 w-[0.75em]'>
                    <div className={`w-[.75em] bg-color h-0.5 ease-linear duration-100 ` + `${navVisibility ? 'w-[.75em] translate-y-[0.188rem] rotate-45' : null}`}></div>
                    <div className={`w-[.75em] bg-color h-0.5 ` + `${navVisibility ? 'hidden' : null}`}></div>
                    <div className={`w-[.75em] bg-color h-0.5 ease-linear duration-100 ` + `${navVisibility ? 'w-[.75em] -translate-y-[0.187rem] -rotate-45' : null}`}></div>
                </div>
            </button>
            <nav className={'flex flex-col py-6 lg:py-0 gap-y-6 lg:gap-y-0 lg:gap-x-0 2xl:gap-x-4 x flex-grow-1 lg:flex-row lg:items-center justify-start fixed lg:static right-0 top-0 bg-nav/95 lg:bg-nav/0 box-content h-full z-40 ease-linear backdrop-blur-sm lg:backdrop-blur-none duration-100 overflow-hidden lg:overflow-visible ' + `${navVisibility ? 'w-full lg:pl-0 lg:pr-0' : 'w-0 lg:w-full'}`}>

                    <div className='relative'>
                        <button id='seasonButton' onClick={() => switchSeasonVisibility()} className={navButtonStyle + ' text-left flex gap-x-4 items-center ' + `${seasonVisibility ? ' bg-color/15 rounded-lg' : ''}`}><svg  className='fill-color w-[1.2rem] lg:hidden' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg>SEZONY</button>
                        <div id='seasonMenu' className={'flex-col ml-4 gap-y-4 ease-linear duration-100 lg:absolute lg:bg-nav/55 lg:p-6 w-full lg:rounded-md ' + `${seasonVisibility ? 'flex' : 'hidden'}`}>
                            <Link to='/events/activeSeasons' className='text-color font-thin ml-8 mt-6 lg:mt-0 lg:ml-0'>Aktualne Sezony</Link>
                            <Link to='/events/archiveSeasons' className='text-color font-thin ml-8 lg:ml-0'>Archiwalne Sezony</Link>
                        </div>
                    </div>

                    <a href='https://discord.com/invite/gVHE7Sf' target='_blank' className={navButtonStyle + ' flex gap-x-4 items-center'}><svg className='fill-color w-[1.2rem] lg:hidden' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg>DISCORD</a>

                    <NavLink to="/stats" className={navButtonStyle + ' flex gap-x-4 items-center'} ><svg className='fill-color w-[1.2rem] lg:hidden' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/></svg>STATYSTYKI</NavLink>

                    <NavLink to="/" className={navButtonStyle + ' flex gap-x-4 items-center'} ><svg className='fill-color w-[1.2rem] lg:hidden' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>AKTUALNOŚCI</NavLink>

                    {isUserLogged ? <NavLink to="/driver" className={navButtonStyle + ' flex gap-x-4 items-center justify-start'}>
                        <div className='relative'>
                            <img className='w-[1.2rem] h-[1.2rem] rounded-full' src={`https://cdn.discordapp.com/avatars/${userBasicInfo.id}/${userBasicInfo.avatar}.png?size=160`} alt=""/>
                        </div>{userBasicInfo.username.toUpperCase()}</NavLink> : null}


                    {userBasicInfo.isAdmin ? <NavLink to='/admin' className={navButtonStyle + ' flex gap-x-4 items-center'}><svg className='fill-color w-[1.2rem] lg:hidden' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z"/></svg>PANEL ADMINISTRACYJNY</NavLink> : null}


                <div className='lg:flex lg:justify-end h-full lg:w-full lg:px-6 xl:px-12'>
                    {displayLoginLogout()}
                </div>
            </nav>
        </header>)
}

export { Nav }