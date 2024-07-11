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
    const driverId = useSelector((state => state.storeData.driverId))

    useEffect(() => {
        axios.get(API_SERVER + '/event/' + eventId)
            .then(response => response.data)
            .then(result => setRaceDetails({
                'displayText': result.displayText,
                'startDate': result.races[0].startDate,
                'presenceActive': result.activeForPresence,
                'banner': result.league.banner
            }))
        axios.get(API_SERVER + '/race/event/' + eventId, {
            params: {
                currentPage: 0,
                pageSize: 20,
                sort: 'startDate',
            }
        })
            .then(response => response.data)
            .then(result => setRaceList(result.content.map(item => <RaceTile key={item.id} id={item.id} name={item.displayText}></RaceTile> )))
            .then(() => setIsLoaded(true))
    }, [eventId])

    return (
        <>{ isLoaded ? <div className='w-full'>
            <div className='relative p-4'>
                <h1 className='p-4 pb-0 text-color text-2xl' >{raceDetails.displayText}</h1>
                <h1 className='p-4 pb-2 text-color text-l font-thin'>{new Date(raceDetails.startDate).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })}</h1>
                <div className='absolute top-0 left-0 w-full h-full z-0 bg-cover opacity-35 ' style={{'backgroundImage': `url('${raceDetails.banner}')`}}></div>

            </div>
            <ButtonPresence driver={driverId} userLogged={isUserLogged} presenceActive={raceDetails.presenceActive}/>

            <div className='text-color flex flex-col lg:flex-row w-full p-8 space-y-4 grow'>
                {raceList ? raceList : null}
            </div>
        </div> : ''}
        </>

    )
}

const RaceTile = props => {
    const raceId = props.id
    const {seasonId} = useParams();

    return (
        <Link to={'/events/season/' + seasonId + '/races/race/' + raceId} className='flex justify-center p-4 bg-bg/45 rounded-xl '>
            <h1 className='text-xl font-thin'>{props.name}</h1>
        </Link>
    )
}

const ButtonPresence = (props) => {

    return (
        <div className='flex p-2 text-color'>
            {props.userLogged && props.presenceActive ? <div className='flex gap-4 mx-auto'>
                <button className='border-color border-[1px] rounded py-2 px-4 w-1/2'>Obecny</button>
                <button className='border-color border-[1px] rounded py-2 px-4 w-1/2'>Nieobecny</button>
            </div> : null}
        </div>
    )
}


export default EventDetails;