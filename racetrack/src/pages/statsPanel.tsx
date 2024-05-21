import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import LoadingSpinner from "../components/loadingSpinner";
import axios from "axios";
import {APIObject} from "../store/appSlice";
import {ChangePageButtonLeft, ChangePageButtonRight} from "../components/changePageButtons";


const StatsPanel = () => {

    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentGame, setCurrentGame] = useState<number>(0)
    const [games, setGames] = useState<any[]>([])

    useEffect(() => {

        axios.get(API_SERVER + '/game', {
            params: {
                currentPage: 0,
                pageSize: 30,
                sort: 'name',
                sortDirection: 'ASC'
            }
        })
            .then(response => setGames(response.data.content.map((item: APIObject) =>  {
                let gameElem = {
                    gameName: item.name,
                    id: item.id
                }
                return gameElem
            })))
            .then(() => setIsLoading(false))

    }, [API_SERVER])

    const handleGameChange = (x: number) => {
        setCurrentGame(currentGame + x)
    }

    return (
        <>
            {!isLoading ? <div className='text-color grow'>
                <h1 className='text-center text-lg py-2 bg-gradient-to-r from-color/10 to-color/0 my-4'>Top Elo Kierowcy</h1>
                <div className='flex flex-row w-full'>
                    <ChangePageButtonLeft disabledVar={!currentGame} onClickFn={() => handleGameChange(-1)}/>
                    <div className='text-center text-lg w-16'>{games[currentGame].gameName}</div>
                    <ChangePageButtonRight disabledVar={currentGame + 1 === games.length} onClickFn={() => handleGameChange(1)} />
                </div>
                <StatsPanelElo gameId={games[currentGame].id} api={API_SERVER}/>
            </div> : <LoadingSpinner/>}
        </>

    )
}

const StatsPanelElo = (props: APIObject) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [eloList, setEloList] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)

    useEffect(() => {

        setIsLoading(true)
        axios.get(props.api + '/elo', {
            params: {
                currentPage,
                pageSize: 10,
                sort: 'value',
                sortDirection: 'DESC',
                gameId: props.gameId
            }
        })
            .then(response => setEloList(response.data.content.map((item: APIObject, index: number) => <li key={item.id} className='grid grid-cols-[1fr_5fr_3fr] gap-x-4 my-2'><span className='font-thin text-right'>{index+1}.</span><span className='ml-3'>{item.driver.nickname}</span><span className='text-center'>{item.value}</span></li>)))
            .then(() => setIsLoading(false))

    }, [props.gameId])


    return (
        <div className='m-4 min-h-48 flex flex-col'>
            <div className='grid grid-cols-[1fr_5fr_3fr] gap-x-4 mb-2 pb-2 border-b-[1px] border-color/55'><span className='text-right'>Lp.</span><span className='ml-3'>Nickname</span><span className='text-center'>pkt.</span></div>
            {!isLoading ? <ul className='list-none w-full'>{eloList.length ? eloList : <li className='flex'><span className='w-full text-center'>Brak danych</span></li>}</ul> : <LoadingSpinner/>}
        </div>
    )
}

export default StatsPanel;