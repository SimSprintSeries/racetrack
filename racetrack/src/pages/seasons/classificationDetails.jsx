import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


const ClassificationDetails = () => {
    const {seasonId} = useParams();
    const [seasonResults, setSeasonResults] = useState();

    useEffect(() => {
        axios.get('http://57.128.195.196:8080/api/classification',
            {
                params: {
                    currentPage: 0,
                    pageSize: 50,
                    sort: 'points',
                    leagueId: seasonId
                },
            })
            .then(result => result.data)
            .then(response => setSeasonResults(response.content.map((item, index) => <ClassificationPosition pos={index} key={item.driver.id} {...item}></ClassificationPosition> )))

    }, [])


    return (
        <div className='text-color grid grid-cols-1 place-items-center w-full h-screen p-3 grow'>
            {seasonResults ? <div className='grid grid-cols-[.6fr_2.2fr_1.8fr_1fr] justify-center w-full p-2'>
                <h1 className='text-center font-thin border-color border-[1px] border-r-0'>Lp.</h1>
                <h1 className='text-center font-thin border-color border-[1px] border-r-0'>Kierowca</h1>
                <h1 className='text-center font-thin border-color border-[1px] border-r-0'>Team</h1>
                <h1 className='text-center font-thin border-color border-[1px]'>Pkt.</h1>
            </div> : 'Chwilka...'}
            {seasonResults}
        </div>
    )
}

const ClassificationPosition = props => {

    return (
        <div className='grid grid-cols-[.6fr_.1fr_2.2fr_1.8fr_1fr] justify-center w-full p-2'>
            <h1 className='text-l text-center'>{props.pos + 1}.</h1>
            <div style={{backgroundColor: '#'+props.team.colour}}></div>
            <h1 className='truncate ml-2'>{props.driver.nickname}</h1>
            <h1 className='truncate ml-2'>{props.team.name}</h1>
            <h1 className='text-center'>{props.points}</h1>
        </div>
    )
}


export default ClassificationDetails;