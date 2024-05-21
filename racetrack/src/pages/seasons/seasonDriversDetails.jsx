import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
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
            .catch(ex => console.log(ex))

    }, [])


    return (
        <>
            { !isLoading ? <div className='text-color grid grid-cols-1 place-items-center w-full p-3 grow'>
                {seasonResults ? <div className='grid grid-cols-[2.9fr_2.8fr] justify-center w-full p-2 border-b-[1px] border-gray-400'>
                    <h1 className='text-center font-thin'>Kierowca</h1>
                    <h1 className='text-center font-thin '>Team</h1>
                </div> : 'Brak danych :('}
                <ul className='list-none w-full animate-slideLeft'>{seasonResults}</ul>

            </div> : <LoadingSpinner/>}
        </>
    )
}

const DriverTile = props => {

    return (
        <li>
            <Link to={'/driver/' + props.id} className='grid grid-cols-[.1fr_2.8fr_2.8fr] justify-center w-full p-2'>
                <div style={props.team ? {backgroundColor: '#'+props.team.colour} : null}></div>
                <h1 className='truncate ml-2'>{props.nickname}</h1>
                <h1 className='truncate ml-2'>{props.team ? props.team.name : null}</h1>
            </Link>
        </li>
    )
}


export default SeasonDriversDetails;