import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";


const EventDetails = () => {
    const {eventId} = useParams();
    const [raceList, setRaceList] = useState();
    const [raceDetails, setRaceDetails] = useState({});

    useEffect(() => {
        axios.get('http://57.128.195.196:8080/api/event/' + eventId)
            .then(response => response.data)
            .then(result => setRaceDetails({
                'displayText': result.displayText,
                'startDate': result.startDate
            }))
        axios.get('http://57.128.195.196:8080/api/race/event/' + eventId, {
            params: {
                currentPage: 0,
                pageSize: 20,
                sort: 'startDate',
            }
        })
            .then(response => response.data)
            .then(result => setRaceList(result.content.map(item => <RaceTile key={item.id} id={item.id} name={item.split.name}></RaceTile> )))
    }, [eventId])


    return (
        <div>
            <h1 className='p-4 pb-0 text-color text-2xl' >{raceDetails.displayText}</h1>
            <h1 className='p-4 pb-2 text-color text-l font-thin'>{raceDetails.startDate}</h1>
            <ButtonPresence/>
            <h1 className='p-2 pb-0 text-color text-xl font-thin text-center'>Splity:</h1>
            <div className='text-color flex flex-col lg:flex-row w-full h-screen p-8 space-y-4 grow'>
            {raceList ? raceList : 'brak'}
            </div>
        </div>

    )
}

const RaceTile = props => {
    const raceId = props.id
    const {seasonId} = useParams();

    return (
        <Link to={'/events/season/' + seasonId + '/races/race/' + raceId} className='flex justify-center p-2 bg-bg/35 rounded-xl '>
            <h1 className='text-2xl'>Split {props.name}</h1>
        </Link>
    )
}

const ButtonPresence = () => {
    const [presence, setPresence] = useState(false)

    const handleClick = () => {
            setPresence(!presence)
    }

    return (
        <div className='flex justify-center p-2'>
            <label onClick={() => handleClick()} htmlFor='presence' className={'p-2 px-4 border-color border-[1px] rounded-xl ease-linear duration-100 ' + `${presence ? 'bg-color text-bg' : 'bg-none text-color'}`} >Zaznacz Obecność</label>
            <input id='presence' name='presence' className='hidden' type="checkbox"/>
        </div>
    )
}


export default EventDetails;