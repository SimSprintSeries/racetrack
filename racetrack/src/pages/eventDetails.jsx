import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";


const EventDetails = () => {
    const {eventId} = useParams();
    const [raceList, setRaceList] = useState();

    useEffect(() => {
        fetch( 'http://57.128.195.196:8080/api/race/event/' + eventId + '?currentPage=0&pageSize=20&sort=startDate&sortDirection=ASC', {headers: {Accept: "*/*"}})
            .then(response => response.json())
            .then(result => setRaceList(result.content.map(item => <RaceTile key={item.id} id={item.id} name={item.split.name}></RaceTile> )))
    }, [eventId])


    return (
        <div>
            <h1 className='p-8 pb-0 text-color text-xl font-thin'>Splity:</h1>
            <div className='text-color flex flex-col lg:flex-row w-full h-screen p-8 space-y-4 grow'>
            {raceList}
            </div>
        </div>

    )
}

const RaceTile = props => {
    const raceId = props.id
    const {seasonId} = useParams();

    return (
        <Link to={'/events/season/' + seasonId + '/race/' + raceId} className='flex justify-center'>
            <h1 className='text-2xl'>Split {props.name}</h1>
        </Link>
    )
}


export default EventDetails;