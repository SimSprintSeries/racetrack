import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useParams} from "react-router-dom";
import { Outlet } from 'react-router-dom'
import {useSelector} from "react-redux";


const ActiveSeasonsDetails = () => {
    const {seasonId} = useParams();
    const adminCheck = useSelector((state) => state.storeData.userData.isAdmin)
    const [menuExpand, setMenuExpand] = useState(false)
    const [menuOption, setMenuOption] = useState()
    const location = useLocation()

    const tabs = [
        {
            key: 'races',
            value: 'Wyścigi'
        },
        {
            key: 'classification',
            value: 'Klasyfikacja'
        },
        {
            key: 'drivers',
            value: 'Kierowcy'
        },
        {
            key: 'rules',
            value: 'Regulamin'
        },
        {
            key: 'reports',
            value: 'Incydenty'
        }
    ]
    const activeLink = 'inline-block p-4 text-color text-base ease-linear duration-100 hidden'
    const normalLink = 'inline-block p-4 font-thin text-base ease-linear duration-100'

    const handleMenuExpand = () => {
        setMenuExpand(!menuExpand)
    }

    useEffect(() => {
        setMenuExpand(false)
    }, [location])

    return (
        <>
            <div
                className="flex flex-col text-sm font-medium text-gray-300 border-b border-gray-500">


                <div className='px-4'>

                    <div className='p-4 text-base  items-center flex gap-x-4' onClick={() => handleMenuExpand()}><span className='relative'>
                    <svg className={'h-[1rem] duration-150 ease-in ' + `${menuExpand ? '-rotate-90 translate-y-56' : 'rotate-90'}`} xmlns="http://www.w3.org/2000/svg" fill='white' viewBox="0 0 320 512">
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                    </svg>
                </span>{tabs.filter(item => window.location.pathname.includes(item.key))[0].value}

                    </div>
                    <div className={'overflow-hidden transition-all duration-200 ' + `${menuExpand ? 'max-h-96' : 'max-h-0'}`}>
                        <ul className="flex flex-col py-2 grow pl-[1.75rem] first:pt-0">
                            <li >
                                <NavLink to={'/events/season/' + seasonId + '/races'}
                                         className={({isActive}) => isActive ? activeLink : normalLink}>Wyścigi</NavLink>
                            </li>
                            <li >
                                <NavLink to={'/events/season/' + seasonId + '/classification'}
                                         className={({isActive}) => isActive ? activeLink : normalLink}>Klasyfikacja</NavLink>
                            </li>
                            <li >
                                <NavLink to={'/events/season/' + seasonId + '/drivers'}
                                         className={({isActive}) => isActive ? activeLink : normalLink}>Kierowcy</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/events/season/' + seasonId + '/rules'}
                                         className={({isActive}) => isActive ? activeLink : normalLink}>Regulamin</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/events/season/' + seasonId + '/reports'}
                                         className={({isActive}) => isActive ? activeLink : normalLink}>Incydenty</NavLink>
                            </li>
                        </ul>
                    </div>

                </div>


            </div>
            <div className='bg-gradient-to-tr from-pink-950/15 via-blue-400/5 to-pink-950/15 min-h-full flex grow'><Outlet /></div>
        </>

    )
}


export default ActiveSeasonsDetails;