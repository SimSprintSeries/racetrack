import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";


const ActiveSeasonsRaces = () => {
    const {seasonId} = useParams();
    const [eventList, setEventList] = useState();

    useEffect(() => {
        axios.get('http://57.128.195.196:8080/api/event', {
            params: {
                currentPage: 0,
                pageSize: 20,
                sort: 'startDate',
                leagueId: seasonId
            }
        })
            .then(response => response.data)
            .then(result => setEventList(result.content.map(item => <EventTile key={item.id} id={item.id} name={item.track.name} country={item.track.country}></EventTile> )))

    }, [seasonId])


    return (
            <div className='text-color flex flex-col lg:flex-row w-full h-screen p-8 gap-y-1 grow'>
            {eventList}
        </div>
    )
}

const EventTile = props => {
    const eventId = props.id
    const {seasonId} = useParams();
    const country = props.country

    return (

        <div className='bg-bg/35 p-3 truncate relative -skew-x-12 rounded-md'>
            <Link to={'/events/season/' + seasonId + '/races/event/' + eventId}>
            <h1 className='skew-x-12'>{props.name}</h1>
                <img className='absolute top-[-6px] right-0 scale-[2] opacity-20 gradient-mask-l-0' src={"https://flagsapi.com/" + country + "/flat/64.png"} alt={country}/>
            </Link>
        </div>

    )
}


export default ActiveSeasonsRaces;