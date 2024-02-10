import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import LoadingSpinner from "../../components/loadingSpinner.jsx";


const ClassificationDetails = () => {
    const {seasonId} = useParams();
    const [seasonResults, setSeasonResults] = useState();
    const [teamSeasonResults, setTeamSeasonResults] = useState();
    const API_SERVER = useSelector(state => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(API_SERVER + '/classification',
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
            .then(() => setIsLoading(false))

        axios.get(API_SERVER + '/classification/team',
            {
                params: {
                    currentPage: 0,
                    pageSize: 50,
                    sort: 'points',
                    leagueId: seasonId
                },
            })
            .then(result => result.data)
            .then(response => setTeamSeasonResults(response.content.map((item, index) => <TeamClassificationPosition pos={index} key={item.team.id} {...item}></TeamClassificationPosition> )))

    }, [seasonId !== 0])


    return (
        <>
            { !isLoading ? <div className='text-color grid grid-cols-1 place-items-center w-full p-3 grow'>
                {seasonResults ? <div className='m-2'><h1 className='text-center text-lg py-2 bg-gradient-to-r from-color/10 to-color/0 rounded'>Klasyfikacja generalna</h1>
                    <div className='grid grid-cols-[.6fr_2.2fr_1.8fr_1fr] justify-center w-full p-2 border-b-[1px] border-gray-400'>
                        <h1 className='text-center font-thin border-color'>Lp.</h1>
                        <h1 className='text-center font-thin border-color'>Kierowca</h1>
                        <h1 className='text-center font-thin border-color'>Team</h1>
                        <h1 className='text-center font-thin border-color'>Pkt.</h1>
                    </div>
                    {seasonResults}
                    <h1 className='text-center text-lg mt-8 py-2 bg-gradient-to-r from-color/10 to-color/0 rounded'>Klasyfikacja drużynowa</h1>
                    <div className='grid grid-cols-[.6fr_4fr_1fr] justify-center w-full p-2 border-b-[1px] border-gray-400'>
                        <h1 className='text-center font-thin border-color'>Lp.</h1>
                        <h1 className='text-center font-thin border-color'>Team</h1>
                        <h1 className='text-center font-thin border-color'>Pkt.</h1>
                    </div>
                    {teamSeasonResults}
                </div> : 'Brak danych :('}
            </div> : <LoadingSpinner/>}
        </>
    )
}

const ClassificationPosition = props => {

    return (
        <div className='grid grid-cols-[.6fr_.1fr_2.2fr_1.8fr_1fr] justify-center w-full p-2'>
            <h1 className='text-l text-center'>{props.pos + 1}.</h1>
            <div style={props.team ? {backgroundColor: '#'+ props.team.colour} : null}></div>
            <h1 className='truncate ml-2'>{props.driver.nickname}</h1>
            <h1 className='truncate ml-2'>{props.team ? props.team.name : null}</h1>
            <h1 className='text-center'>{props.points}</h1>
        </div>
    )
}

const TeamClassificationPosition = props => {

    return (
        <div className='grid grid-cols-[.6fr_.1fr_4fr_1fr] justify-center w-full p-2'>
            <h1 className='text-l text-center'>{props.pos + 1}.</h1>
            <div style={props.team ? {backgroundColor: '#'+ props.team.colour} : null}></div>
            <h1 className='truncate ml-2'>{props.team ? props.team.name : null}</h1>
            <h1 className='text-center'>{props.points}</h1>
        </div>
    )
}


export default ClassificationDetails;