import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";


const ActiveSeasons = () => {
    const [activeSeasonsList, setActiveSeasonsList] = useState();
    const API_SERVER = useSelector(state => state.storeData.apiServer)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(API_SERVER + '/league', {
            params: {
                currentPage: 0,
                pageSize: 10,
                sort: 'startDate',
                active: true
            }
        })
            .then(response => response.data)
            .then(result => setActiveSeasonsList(result.content.map((item, index) => <ActiveSeasonTile key={item.id} name={item.name} id={item.id} img={item.banner} index={index}></ActiveSeasonTile>)))
            .then(() => setIsLoaded(true))
    }, [])

    return (
        <div className={`text-color flex flex-col w-full grow p-16 space-y-4 lg:flex-row lg:space-y-0`}>
            {activeSeasonsList}
            </div>
    )
}

// kafelek aktywnego sezonu
const ActiveSeasonTile = props => {
    const seasonId = props.id

    return (
        <Link to={'/events/season/'+ seasonId + '/races'} className={'flex relative grow max-h-[33vh] bg-bg/20 items-center justify-center hover:cursor-pointer lg:border-[1px] border-color lg:max-h-fit rounded-lg animate-slideUp'}>
            <h1 className='z-20'>{props.name}</h1>
            <div className={`absolute right-0 top-0 w-full h-full aspect-auto z-10 rounded-lg bg-cover bg-center opacity-20`} style={{'background-image': `url('${props.img}')`}}></div>
        </Link>
    )
}

export default ActiveSeasons;