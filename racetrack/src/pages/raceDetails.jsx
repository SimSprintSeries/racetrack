import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";


const RaceDetails = () => {
    const {raceId} = useParams();
    const [raceList, setRaceList] = useState();

    useEffect(() => {
        fetch( 'http://57.128.195.196:8080/api/race/event/' + raceId + '?currentPage=0&pageSize=20&sort=startDate&sortDirection=ASC', {headers: {Accept: "*/*"}})
            .then(response => response.json())
            .then(result => setRaceList(result.content.map(item => <RaceResultPosition key={item.id} name={item.split.name}></RaceResultPosition> )))
    }, [raceId])


    return (
        <Link className='text-color flex flex-col lg:flex-row w-full h-screen p-16 space-y-4 grow'>
            {raceList}
        </Link>
    )
}

const RaceResultPosition = props => {
    return (
        <div className='flex justify-center'>
            <h1 className='text-2xl'>Split {props.name}</h1>
        </div>
    )
}


export default RaceDetails;