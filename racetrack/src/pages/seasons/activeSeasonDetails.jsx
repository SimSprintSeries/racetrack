import React from "react";
import {NavLink, useParams} from "react-router-dom";
import { Outlet } from 'react-router-dom'


const ActiveSeasonsDetails = () => {
    const {seasonId} = useParams();


    const activeLink = 'inline-block p-4 border-b-2 border-transparent rounded-t-lg border-gray-300'
    const normalLink = 'inline-block p-4 border-b-2 border-transparent rounded-t-lg'

    return (
        <>
            {/*<div className='text-color bg-bg p-2 flex '>*/}
            {/*    <Link className='grow text-center target:text-red' to={'/events/season/' + seasonId + '/races'}>Wyścigi</Link>*/}
            {/*    <Link className='grow text-center' to={'/events/season/' + seasonId + '/classification'}>Klasyfikacja</Link>*/}
            {/*    <Link className='grow text-center' to={'/events/season/' + seasonId + '/drivers'}>Kierowcy</Link>*/}
            {/*    <Link className='grow text-center' to={'/events/season/' + seasonId + '/rules'}>Regulamin</Link>*/}
            {/*</div>*/}
            <div
                className="flex text-sm font-medium text-center text-gray-300 border-b border-gray-200 border-gray-700">
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
            <Outlet />
        </>

    )
}


export default ActiveSeasonsDetails;