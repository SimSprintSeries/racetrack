import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import LoadingSpinner from "../../components/loadingSpinner.jsx";


const RaceDetails = () => {
    const {raceId} = useParams();
    const [raceResults, setRaceResults] = useState();
    const API_SERVER = useSelector(state => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(API_SERVER + '/raceresult', {
            params: {
                currentPage: 0,
                pageSize: 40,
                sort: 'finishPosition',
                raceId: raceId
            }
        })
            .then(response => response.data)
            .then(result => setRaceResults(result.content.map(item => <RaceResultPosition key={item.id} {...item}></RaceResultPosition> )))
            .then(() => setIsLoading(false))
    }, [raceId])


    return (
        <>
            { !isLoading ? <div className='text-color grid grid-cols-1 place-items-center w-full h-screen p-3 grow'>
                {raceResults ? <div className='grid grid-cols-[.6fr_3.1fr_1fr_1fr_1fr_1fr] justify-center w-full p-2'>
                    <h1 className='text-center font-thin border-color border-[1px] border-r-0'>Lp.</h1>
                    <h1 className='text-center font-thin border-color border-[1px] border-r-0'>Kierowca</h1>
                    <h1 className='text-center font-thin border-color border-[1px] border-r-0'>PP</h1>
                    <h1 className='text-center font-thin border-color border-[1px] border-r-0'>FL</h1>
                    <h1 className='text-center font-thin border-color border-[1px] border-r-0'>DNF</h1>
                    <h1 className='text-center font-thin border-color border-[1px]'>Pkt.</h1>
                </div> : 'Brak wyników'}
                {raceResults}
            </div> : <LoadingSpinner/>}
        </>
    )
}

const RaceResultPosition = props => {
    const bgColorFL = props.fastestLap ? 'rgba(158, 20, 217, 0.3)' : ''

    return (
        <div className='grid grid-cols-[.6fr_.1fr_3fr_1fr_1fr_1fr_1fr] justify-center w-full p-2' style={{backgroundColor: bgColorFL}}>
            <h1 className='text-l text-center'>{props.finishPosition}.</h1>
            <div style={{backgroundColor: '#'+props.team.colour}}></div>
            <h1 className='truncate ml-2'>{props.driver.nickname}</h1>
            <h1 className='text-center'>{props.polePosition ? 'PP' : ''}</h1>
            <h1 className='text-center'>{props.fastestLap ? 'FL' : ''}</h1>
            <h1 className='text-center'>{props.dsq ? 'DSQ' : (props.dnf ? 'DNF' : '')}</h1>
            <h1 className='text-center'>{props.pointsForPosition ? props.pointsForPosition : '-'}</h1>
        </div>
    )
}


export default RaceDetails;