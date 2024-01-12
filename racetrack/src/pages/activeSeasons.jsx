import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";


const ActiveSeasons = () => {
    const [activeSeasonsList, setActiveSeasonsList] = useState();

    useEffect(() => {
        fetch( 'http://57.128.195.196:8080/api/league/paginated?currentPage=0&pageSize=20&sort=startDate&sortDirection=DESC&active=true', {headers: {Accept: "*/*"}})
            .then(response => response.json())
            .then(result => setActiveSeasonsList(result.content.map(item => <ActiveSeasonTile key={item.id} name={item.name} id={item.id}></ActiveSeasonTile>)))
    }, [])


    return (
        <div className='text-color flex flex-col lg:flex-row w-full h-screen p-16 space-y-4'>
            {activeSeasonsList}
            </div>
    )
}
const ActiveSeasonTile = props => {
    const seasonId = props.id

    return (
        <Link to={'/events/season/'+ seasonId} className='flex relative grow max-h-[33vh] items-center justify-center hover:cursor-pointer'>
            <h1 className='z-20'>{props.name}</h1>
            <div className='absolute right-0 top-0 w-full h-full z-10 bg-bg/35'></div>
        </Link>
    )
}

export default ActiveSeasons;