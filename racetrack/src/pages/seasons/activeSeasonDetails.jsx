import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import { Outlet } from 'react-router-dom'


const ActiveSeasonsDetails = () => {
    const {seasonId} = useParams();

    return (
        <div>
            <div className='text-color bg-bg p-2 flex '>
                <Link id="events/season/16/races" className='grow text-center target:text-red' to={'/events/season/' + seasonId + '/races'}>Wyścigi</Link>
                <Link className='grow text-center' to={'/events/season/' + seasonId + '/classification'}>Klasyfikacja</Link>
                <Link className='grow text-center' to={'/events/season/' + seasonId + '/drivers'}>Kierowcy</Link>
                <Link className='grow text-center'>Regulamin</Link>
            </div>
            <Outlet />
        </div>

    )
}


export default ActiveSeasonsDetails;