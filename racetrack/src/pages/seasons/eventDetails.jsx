import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";


const EventDetails = () => {
    const {eventId} = useParams();
    const [raceList, setRaceList] = useState();
    const [raceDetails, setRaceDetails] = useState({});
    const [isLoaded, setIsLoaded] = useState(false)
    const API_SERVER = useSelector(state => state.storeData.apiServer)
    const isUserLogged = useSelector(state => state.storeData.isDiscordLogged)

    useEffect(() => {
        axios.get(API_SERVER + '/event/' + eventId)
            .then(response => response.data)
            .then(result => setRaceDetails({
                'displayText': result.displayText,
                'startDate': result.startDate,
                'presenceActive': result.activeForPresence
            }))
        axios.get(API_SERVER + '/race/event/' + eventId, {
            params: {
                currentPage: 0,
                pageSize: 20,
                sort: 'startDate',
            }
        })
            .then(response => response.data)
            .then(result => setRaceList(result.content.map(item => <RaceTile key={item.id} id={item.id} name={item.split.name}></RaceTile> )))
            .then(() => setIsLoaded(true))
    }, [eventId])

    const displayPresenceButton = () => {
        if(raceDetails.presenceActive && isUserLogged) {
            return <ButtonPresence/>
        } else {
            return null
        }
    }

    return (
        <div>{ isLoaded ? <div>
            <h1 className='p-4 pb-0 text-color text-2xl' >{raceDetails.displayText}</h1>
            <h1 className='p-4 pb-2 text-color text-l font-thin'>{new Date(raceDetails.startDate).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })}</h1>
            {displayPresenceButton()}
            <h1 className='p-2 pb-0 text-color text-xl font-thin text-center'>{raceList.length ? 'Wyniki:' : ''}</h1>
            <div className='text-color flex flex-col lg:flex-row w-full h-screen p-8 space-y-4 grow'>
                {raceList}
            </div>
        </div> : ''}
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