import React from "react";
import {useState, useEffect} from "react";

const pageSize = 12;
const eventsButtonStyle = 'text-color text-center border-[1px] border-white rounded-[25px] px-4 py-2 disabled:opacity-50 hover:bg-color hover:text-green ease-linear duration-100'

const EventsPanel = () => {
    const [raceList, setRaceList] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetch("http://57.128.195.196:8080/api/race?currentPage=" + page +"&pageSize=" + pageSize + "&sort=startDate", {headers: {Accept: "*/*"}})
            .then(response => response.json())
            .then(result => setRaceList(result.content.map(item => <EventTile key={item.id} {...item} />)))
            .catch(err => console.log(err))
    }, [page])

    const changePage = number => {
        setPage(page + number);
    }

    return (
        <div className='p-12 text-color flex flex-col w-full grow'>
            <div className='grid grid-cols-2 lg:grid-cols-6 gap-12 grow'>{raceList}</div>
            <div className='flex gap-12 justify-center mt-12'>
                <button className={eventsButtonStyle} onClick={() => changePage(-1)} disabled={!page}>Poprzednia</button>
                <button className={eventsButtonStyle} onClick={() => changePage(1)} disabled={raceList.length<pageSize}>Następna</button>
            </div>
        </div>
    )
}

const EventTile = props => {
    return (
        <div className='border-[1px] rounded-[15px] border-color border-solid p-4'>
            <h1 className='lg:text-2xl text-center'>{props.split.league.game.name} Liga {props.split.name} </h1>
            <p>{props.startDate}</p>
        </div>
    )
}

export default EventsPanel;