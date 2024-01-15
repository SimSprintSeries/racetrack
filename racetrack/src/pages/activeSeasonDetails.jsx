import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";


const ActiveSeasonsDetails = () => {
    const {seasonId} = useParams();
    const [eventList, setEventList] = useState();

    useEffect(() => {
        fetch( 'http://57.128.195.196:8080/api/event?currentPage=0&pageSize=20&sort=startDate&sortDirection=ASC&leagueId=' + seasonId, {headers: {Accept: "*/*"}})
            .then(response => response.json())
            .then(result => setEventList(result.content.map(item => <EventTile key={item.id} id={item.id} name={item.track.name} country={item.track.country}></EventTile> )))
    }, [seasonId])


    return (
        <div>
            <h1 className='p-8 pb-0 text-color text-xl font-thin'>Lista wyścigów:</h1>
            <div className='text-color flex flex-col lg:flex-row w-full h-screen p-8 gap-y-1 grow'>
            {eventList}
        </div>
        </div>

    )
}

const EventTile = props => {
    const eventId = props.id
    const {seasonId} = useParams();
    const country = props.country

    return (

        <div className='bg-bg/35 p-3 truncate relative'>
            <Link to={'/events/season/' + seasonId + '/event/' + eventId}>
            <h1>{props.name}</h1>
                <img className='absolute top-[-6px] right-0 scale-[2] opacity-20 gradient-mask-l-0' src={"https://flagsapi.com/" + country + "/flat/64.png"} alt={country}/>
            </Link>
        </div>

    )
}


export default ActiveSeasonsDetails;