import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
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

        const apiFn = async () => {
            await axios.get(API_SERVER + '/classification',
                {
                    params: {
                        currentPage: 0,
                        pageSize: 50,
                        leagueId: seasonId
                    },
                })
                .then(result => result.data)
                .then(response => setSeasonResults(response.content.map((item, index) => <ClassificationPosition pos={index} key={item.driver.id} {...item}></ClassificationPosition> )))

            await axios.get(API_SERVER + '/classification/team',
                {
                    params: {
                        currentPage: 0,
                        pageSize: 50,
                        leagueId: seasonId
                    },
                })
                .then(result => result.data)
                .then(response => setTeamSeasonResults(response.content.map((item, index) => <TeamClassificationPosition pos={index} key={item.team.id} {...item}></TeamClassificationPosition> )))
        }

        apiFn()
            .then(() => setIsLoading(false))

    }, [seasonId !== 0])


    return (
        <>
            { !isLoading ? <div className={`text-color grid grid-cols-1 place-items-center w-full grow `}>
                {seasonResults ? <div className='lg:flex lg:w-full'>
                    <div className='flex flex-col grow'>
                        <h1 className='text-center w-full text-lg font-light py-2 backdrop-blur-sm bg-gradient-to-l from-green/10 via-blue-400/10 to-pink-950/10'>Klasyfikacja generalna</h1>
                    <div className='px-4 grid grid-cols-[.6fr_2.2fr_1.8fr_1fr] justify-center w-full p-2 border-b-[1px] border-gray-400'>
                        <h1 className='text-center font-thin border-color'>Lp.</h1>
                        <h1 className='text-center font-thin border-color'>Kierowca</h1>
                        <h1 className='text-center font-thin border-color'>Team</h1>
                        <h1 className='text-center font-thin border-color'>Pkt.</h1>
                    </div>
                    <ul className='list-none w-full px-3 animate-slideLeft'>{seasonResults}</ul>
                    </div>
                    <div className='flex flex-col grow'>
                    <h1 className='text-center text-lg mt-8 py-2 font-light backdrop-blur-sm bg-gradient-to-l from-green/10 via-blue-400/10 to-pink-950/10 lg:mt-0'>Klasyfikacja drużynowa</h1>
                    <div className='grid grid-cols-[.6fr_4fr_1fr] justify-center w-full p-2 border-b-[1px] border-gray-400 px-3'>
                        <h1 className='text-center font-thin border-color'>Lp.</h1>
                        <h1 className='text-center font-thin border-color'>Team</h1>
                        <h1 className='text-center font-thin border-color'>Pkt.</h1>
                    </div>
                    <ul className='list-none w-full px-4 animate-slideLeft'>{teamSeasonResults}</ul>
                    </div>
                </div> : 'Brak danych :('}
            </div> : <LoadingSpinner/>}
        </>
    )
}

const ClassificationPosition = props => {

    return (
        <li>
                <div className='grid grid-cols-[.6fr_.1fr_2.2fr_1.8fr_1fr] lg:grid-cols-[.65fr_.05fr_2.2fr_1.8fr_1fr] justify-center w-full p-2'>
                <h1 className='text-l text-center'>{props.pos + 1}.</h1>
                <div style={props.team ? {backgroundColor: '#'+ props.team.colour} : null}></div>
                <h1 className='truncate ml-2'><Link to={'/driver/' + props.driver.id} className='hover:cursor-pointer'>{props.driver.nickname}</Link></h1>
                <h1 className='truncate ml-2'>{props.team ? props.team.name : null}</h1>
                <h1 className='text-center'>{props.points}</h1>
                </div>
        </li>
    )
}

const TeamClassificationPosition = props => {

    return (
        <li>
            <div className='grid grid-cols-[.6fr_.1fr_4fr_1fr] lg:grid-cols-[.65fr_.05fr_4fr_1fr] justify-center w-full p-2'>
                <h1 className='text-l text-center'>{props.pos + 1}.</h1>
                <div style={props.team ? {backgroundColor: '#'+ props.team.colour} : null}></div>
                <h1 className='truncate ml-2'>{props.team ? props.team.name : null}</h1>
                <h1 className='text-center'>{props.points}</h1>
            </div>
        </li>
    )
}


export default ClassificationDetails;