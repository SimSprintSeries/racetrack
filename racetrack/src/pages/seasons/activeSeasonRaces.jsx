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
    const [banner, setBanner] = useState('');

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
            .then(result => {
                setEventList(result.content.map(item => <EventTile key={item.id} id={item.id} name={item.displayText}
                                                                   trackname={item.track.name} seasonId={seasonId}
                                                                   country={item.track.country}></EventTile>))
                setBanner(result.content[0].league.banner)
            })
            .then(() => setIsLoading(false))

        axios.get(API_SERVER + '/league/nextEvent', {
            params: {
                leagueId: seasonId
            }
        })
            .then(response => setNextEvent(response.data))
    }, [seasonId])


    return (
        <>
            { !isLoading ?
            <div className='w-full'>
                    <div className='w-full opacity-70 p-16 bg-cover -z-10 opacity-30' style={{'background-image': `url('${banner}')`}}></div>

            <div className='flex text-color flex-col w-full p-8'>
            {nextEvent ? <div className='flex text-color flex-col'>
                <h1>Kolejny wyścig:</h1>
                <NextEventTile {...nextEvent} seasonId={seasonId} isLoading={isLoading} />
            </div> : ''}
            <h1 className='mb-2'>Lista wyścigów:</h1>
                <div className='text-color flex flex-col gap-y-2 grow lg:max-w-[50%]'>
                {eventList}
                </div>
            </div>
            </div> : <LoadingSpinner/>
            }
        </>

    )
}

const EventTile = props => {

    return (

        <div className=' p-3 truncate relative rounded-md hover:-translate-y-1 duration-100 bg-gradient-to-bl from-bg/10 to-bg/75 animate-slideLeft'>
            <Link to={'/events/season/' + props.seasonId + '/races/event/' + props.id}>
                <div className='flex flex-col'><span className='font-bold'>{props.name}</span><span className='text-[0.8em] ml-2 text-color/55'>{props.trackname}</span></div>
                <img className='absolute top-1 right-0 scale-[2] opacity-20 gradient-mask-l-0' src={"https://flagsapi.com/" + props.country + "/flat/64.png"} alt={props.country}/>
            </Link>
        </div>

    )
}

const NextEventTile = props => {


        return (
            <div className={`w-full p-4 border-color my-4 rounded-lg gradient-bg animate-slideLeft`}>
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
            </div>
        )
}


export default ActiveSeasonsRaces;