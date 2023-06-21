import React from "react";
import {useState, useEffect} from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {useDispatch, useSelector} from "react-redux";
import {toggleLoaded} from "../store/appSlice.jsx";

const pageSize = 12;
const eventsButtonStyle = 'text-color text-center border-[1px] border-white rounded-[25px] px-4 py-2 disabled:opacity-50 hover:bg-color hover:text-green ease-linear duration-100'

const EventsPanel = () => {
    const [raceList, setRaceList] = useState([])
    const [page, setPage] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(toggleLoaded(false))
        fetch("http://57.128.195.196:8080/api/league", {headers: {Accept: "*/*"}})
            .then(response => response.json())
            .then(result => setRaceList(result.map(item => <SeasonTile key={item.id} {...item} />)))
            .then(() => dispatch(toggleLoaded(true)))
            .catch(err => console.log(err))
    }, [page])

    const changePage = number => {
        setPage(page + number);
    }

    return (
        <div className='p-12 text-color flex flex-col w-full grow'>
            <div className='grid grid-cols-4 grow gap-4'>{raceList}</div>
            <div className='flex gap-12 justify-center mt-12'>
                <button className={eventsButtonStyle} onClick={() => changePage(-1)} disabled={!page}>Poprzednia</button>
                <button className={eventsButtonStyle} onClick={() => changePage(1)} disabled={raceList.length<pageSize}>Następna</button>
            </div>
        </div>
    )
}

const SeasonTile = props => {

    const {storeData} = useSelector(state => state)

    return (
        <>
            {storeData.isLoaded ? (
            <div className='group border-[1px] first:rounded-tl-3xl last:rounded-br-3xl border-nav border-solid p-4 grow relative overflow-hidden cursor-pointer flex justify-center hover:z-10 ease-linear duration-100 rounded-2xl min-h-[22vh]'>
                <div className='h-full w-[2%] bg-amber-50 box-border rounded'></div>
            <h1 className='lg:text-2xl text-center p-2 grow box-content'>{props.name}</h1>
                <div className='absolute bg-[url("./images/miami-race.png")] opacity-90 brightness-[.40] blur-sm bg-cover bg-left-top w-full h-full left-0 top-0 z-[-99999] group-hover:brightness-75 group-hover:bg-center ease-linear duration-100'></div>
            </div>
            ) : <Skeleton color="#202020" highlightColor="#aaa" style={{borderRadius: 15, height: '100%', opacity: '9%'}} duration={.5} />}
        </>
    )
}

export default EventsPanel;