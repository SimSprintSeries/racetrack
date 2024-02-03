import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import LoadingSpinner from "../../components/loadingSpinner.jsx";


const ActiveSeasonsRaces = () => {
    const {seasonId} = useParams();
    const [eventList, setEventList] = useState();
    const [nextEvent, setNextEvent] = useState({track: {name: ''}})
    const API_SERVER = useSelector(state => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(API_SERVER + '/event', {
            params: {
                currentPage: 0,
                pageSize: 20,
                sort: 'startDate',
                leagueId: seasonId
            }
        })
            .then(response => response.data)
            .then(result => setEventList(result.content.map(item => <EventTile key={item.id} id={item.id} name={item.track.name} seasonId={seasonId} country={item.track.country}></EventTile> )))

        axios.get(API_SERVER + '/league/nextEvent', {
            params: {
                leagueId: seasonId
            }
        })
            .then(response => setNextEvent(response.data))
            .then(() => setIsLoading(false))
    }, [seasonId])


    return (
        <>
            { !isLoading ? <div className='flex text-color flex-col w-full p-8'>
            {nextEvent ? <div className='flex text-color flex-col'>
                Kolejny wyścig:
                <NextEventTile {...nextEvent} seasonId={seasonId} />
            </div> : ''}
            <h1 className='mb-2'>Lista wyścigów:</h1>
            <div className='text-color flex flex-col  gap-y-2 grow lg:max-w-[50%]'>
                {eventList}
            </div>
            </div> : <LoadingSpinner/>
            }
        </>

    )
}

const EventTile = props => {

    return (

        <div className=' p-3 truncate relative -skew-x-12 rounded-md hover:-translate-y-1 duration-100 bg-gradient-to-bl from-bg/10 to-bg/75'>
            <Link to={'/events/season/' + props.seasonId + '/races/event/' + props.id}>
            <h1 className='skew-x-12'>{props.name}</h1>
                <img className='absolute top-[-6px] right-0 scale-[2] opacity-20 gradient-mask-l-0' src={"https://flagsapi.com/" + props.country + "/flat/64.png"} alt={props.country}/>
            </Link>
        </div>

    )
}

const NextEventTile = props => {
        return (
            <Link to={'/events/season/' + props.seasonId + '/races/event/' + props.id} className='w-full p-4 border-color border-[1px] my-4 rounded-lg bg-color/20 '>
                <h1 className='font-thin'>{props.displayText}</h1>
                <h1 className='text-xl'>{props.track.name}</h1>
                <h1 className='font-thin text-sm text-right mt-2'>{new Date(props.startDate).toLocaleString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'UTC'
                })}</h1>
            </Link>
        )
}


export default ActiveSeasonsRaces;