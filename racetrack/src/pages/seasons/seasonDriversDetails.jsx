import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import LoadingSpinner from "../../components/loadingSpinner.jsx";


const SeasonDriversDetails = () => {
    const {seasonId} = useParams();
    const [seasonResults, setSeasonResults] = useState();
    const API_SERVER = useSelector(state => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(API_SERVER + '/driver/league/' + seasonId,
            {
                params: {
                    currentPage: 0,
                    pageSize: 50,
                    sort: 'points',
                },
            })
            .then(result => result.data)
            .then(response => setSeasonResults(response.content.map((item, index) => <DriverTile pos={index} key={item.id} {...item}></DriverTile> )))
            .then(() => setIsLoading(false))

    }, [])


    return (
        <>
            { !isLoading ? <div className='text-color grid grid-cols-1 place-items-center w-full h-screen p-3 grow'>
                {seasonResults ? <div className='grid grid-cols-[2.9fr_2.8fr] justify-center w-full p-2'>
                    <h1 className='text-center font-thin border-color border-[1px] border-r-0'>Kierowca</h1>
                    <h1 className='text-center font-thin border-color border-[1px]'>Team</h1>
                </div> : 'Brak danych :('}
                {seasonResults}
            </div> : <LoadingSpinner/>}
        </>
    )
}

const DriverTile = props => {

    return (
        <div className='grid grid-cols-[.1fr_2.8fr_2.8fr] justify-center w-full p-2'>
            <div style={{backgroundColor: '#'+props.team.colour}}></div>
            <h1 className='truncate ml-2'>{props.nickname}</h1>
            <h1 className='truncate ml-2'>{props.team.name}</h1>
        </div>
    )
}


export default SeasonDriversDetails;