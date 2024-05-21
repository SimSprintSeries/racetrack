import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useParams} from "react-router-dom";
import { Outlet } from 'react-router-dom'
import {useSelector} from "react-redux";


const ActiveSeasonsDetails = () => {
    const {seasonId} = useParams();
    const adminCheck = useSelector((state) => state.storeData.userData.isAdmin)
    const [menuExpand, setMenuExpand] = useState(false)
    const location = useLocation()

    const activeLink = 'inline-block p-4 border-b-2 rounded-t-lg border-color text-color ease-linear duration-100'
    const normalLink = 'inline-block p-4 border-b-2 border-transparent rounded-t-lg ease-linear duration-100'

    const handleMenuExpand = () => {
        setMenuExpand(!menuExpand)
    }

    useEffect(() => {
        setMenuExpand(false)
    }, [location])

    return (
        <>
            <div
                className="flex flex-col text-sm font-medium text-center text-gray-300 border-b border-gray-500">
                <ul className="flex flex-wrap grow items-start">
                    <li className="mx-auto">
                        <NavLink to={'/events/season/' + seasonId + '/races'}
                           className={({isActive}) => isActive ? activeLink : normalLink}>Wyścigi</NavLink>
                    </li>
                    <li className="mx-auto">
                        <NavLink to={'/events/season/' + seasonId + '/classification'}
                           className={({isActive}) => isActive ? activeLink : normalLink}>Klasyfikacja</NavLink>
                    </li>
                    <li className="mx-auto">
                        <NavLink to={'/events/season/' + seasonId + '/drivers'}
                           className={({isActive}) => isActive ? activeLink : normalLink}>Kierowcy</NavLink>
                    </li>
                    <li className="mx-auto">
                        <NavLink to={'/events/season/' + seasonId + '/rules'}
                           className={({isActive}) => isActive ? activeLink : normalLink}>Regulamin</NavLink>
                    </li>
                    <li className={"mx-auto overflow-hidden transition-all ease-linear duration-300 " + `${menuExpand ? 'max-h-40' : 'max-h-0'}`}>
                        <NavLink to={'/events/season/' + seasonId + '/reports'}
                                 className={({isActive}) => isActive ? activeLink : normalLink}>Incydenty</NavLink>
                    </li>
                </ul>
                <button onClick={() => handleMenuExpand()} className={'ease-out duration-500 py-1 ' + `${menuExpand ? 'rotate-180' : ''}`}>▼</button>
            </div>
            <div className='bg-gradient-to-b from-bg/40 to-bg/55 min-h-full flex grow'><Outlet /></div>
        </>

    )
}


export default ActiveSeasonsDetails;