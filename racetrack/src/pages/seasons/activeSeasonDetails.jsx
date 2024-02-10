import React from "react";
import {NavLink, useParams} from "react-router-dom";
import { Outlet } from 'react-router-dom'


const ActiveSeasonsDetails = () => {
    const {seasonId} = useParams();


    const activeLink = 'inline-block p-4 border-b-2 rounded-t-lg border-color text-color ease-linear duration-100'
    const normalLink = 'inline-block p-4 border-b-2 border-transparent rounded-t-lg ease-linear duration-100'

    return (
        <>
            <div
                className="flex text-sm font-medium text-center text-gray-300 border-b border-gray-500 ">
                <ul className="flex flex-wrap grow">
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
                </ul>
            </div>
            <div className='bg-gradient-to-b from-bg/40 to-bg/55 min-h-full grow'><Outlet /></div>
        </>

    )
}


export default ActiveSeasonsDetails;