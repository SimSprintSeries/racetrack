import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner";
import {Link, useParams} from "react-router-dom";
import {APIObject} from "../../store/appSlice";
import {ChangePageButtonLeft, ChangePageButtonRight} from "../../components/changePageButtons";

const OtherDriverPanel = () => {

    const {driverId} = useParams<APIObject>();
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [driverStats, setDriverStats] = useState<APIObject>({})
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        if(driverId !== null) {
            axios.get(API_SERVER + '/driver/' + driverId)
                .then(response => setDriverStats(response.data))
                .then(() => {

                })
                .then(() => setIsLoading(false))
                .catch(ex => console.log(ex))
        }
    }, [driverId !== null])

    return (
        <>
            { !isLoading ? <div className='flex flex-col text-color m-4 border-l-[1px] border-color/35 gap-y-4'>
                <OtherDriverMainInfo name={driverStats.nickname} avatar={driverStats.discordUser.avatar} id={driverStats.discordUser.id}/>
                <OtherDriverRaceStats {...driverStats}/>
                <OtherDriverElo {...driverStats}/>
                <OtherDriverSeasons driverId={driverId} api={API_SERVER}/>
            </div> : <LoadingSpinner/>}
        </>
    )
}

const OtherDriverMainInfo = (props: APIObject) => {
    return (
        <div className='text-2xl px-6 py-3 bg-bg/55 flex gap-x-3 items-center rounded-r-lg'>
            <img className={"w-16 h-16 rounded-full ring-2 ring-color " + `${props.avatar ? '' : 'opacity-75'}`}
                 src={props.avatar ? `https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}.png?size=160` : `https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png`} alt="" />
            <div>{props.name}</div>
        </div>
    )
}

const OtherDriverRaceStats = (props: APIObject) => {

    const tileStyle = 'bg-bg/65 p-3 flex flex-col rounded'

    return (
        <div className='bg-bg/55 rounded-r-lg'>
            <div className='px-4 pt-4'>
                <span className='text-sm text-color/75'>Statystyki</span>
            </div>
                <div className='grid grid-cols-3 grid-rows-2 px-4 py-4 gap-1'>
                <div className={tileStyle}><span className='text-[12px] text-color/85'>Wyścigi: </span><span className='text-lg text-right font-bold mt-1'>{props.totalRacesDriven ? props.totalRacesDriven : 0}</span></div>
                <div className={tileStyle}><span className='text-[12px] text-color/85'>Zwycięstwa: </span><span className='text-lg text-right font-bold mt-1'>{props.totalWins ? props.totalWins : 0}</span></div>
                <div className={tileStyle}><span className='text-[12px] text-color/85'>Podium: </span><span className='text-lg text-right font-bold mt-1'>{props.podiums ? props.podiums : 0}</span></div>
                <div className={tileStyle}><span className='text-[12px] text-color/85'>Top 10: </span><span className='text-lg text-right font-bold mt-1'>{props.totalTopTenResults ? props.totalTopTenResults : 0}</span></div>
                <div className={tileStyle}><span className='text-[12px] text-color/85'>Najszybsze okr.: </span><span className='text-lg text-right font-bold mt-1'>{props.fastestLaps ? props.fastestLaps : 0 }</span></div>
                <div className={tileStyle}><span className='text-[12px] text-color/85'>Pole Position: </span><span className='text-lg text-right font-bold mt-1'>{props.polePositions ? props.polePositions : 0 }</span></div>
            </div>
        </div>
    )
}

const OtherDriverElo = (props: APIObject) => {

    const [gameElo, setGameElo] = useState<[]>([])

    useEffect(() => {
        const eloArray = props.elos.sort((a: APIObject, b: APIObject) => b.value - a.value).map((item: APIObject) => {
            return (
                <div key={item.id} className='flex flex-col p-4 bg-bg/65 gap-y-1 rounded-lg min-w-[7em]'>
                    <span className='text-lg font-bold truncate'>{item.game.name}:</span>
                    <span className='font-thin text-right'>{item.value}</span>
                </div>
            )
        })
        setGameElo(eloArray)
    }, [props !== undefined])

    return (
        <div className='px-4 pt-4 bg-bg/55 rounded-r-lg'>
            <span className='text-sm text-color/75'>Elo</span>
            <div className=' py-4 flex overflow-auto gap-x-2'>
                {gameElo.length ? gameElo : <span className='font-thin text-center w-full'>Brak elo do wyświetlenia</span>}
            </div>
        </div>
    )
}

const OtherDriverSeasons = (props: {driverId: number | string, api: string}) => {

    const [page, setPage] = useState<number>(0)
    const [driverSeasons, setDriverSeasons] = useState<[]>([])
    const [lastPage, setLastPage] = useState<boolean>(false)
    const pageSize = 5

    useEffect(() => {
        axios.get(props.api + '/league/driver/' + props.driverId, {
            params: {
                currentPage: page,
                pageSize,
                sort: 'startDate',
                sortDirection: 'DESC'
            }
        })
            .then(response => {
                setDriverSeasons(response.data.content.map((item: APIObject) => <Link className='truncate my-1'
                                                                                      key={item.id}
                                                                                      to={'/events/season/' + item.id + '/races'}>{item.name}</Link>))
                setLastPage(response.data.last)
            })
    }, [props.driverId !== 0, page])

    const changePage = (x: number) => {
        setPage(page+x);
    }

    return (
        <div className='px-4 pt-4 bg-bg/55 rounded-r-lg'>
            <span className='text-sm text-color/75'>Sezony</span>
            <div className='px-0 py-4 flex min-h-[12em]'>
                <ChangePageButtonLeft onClickFn={() => changePage(-1)} disabledVar={!page} />
            <div className='flex flex-col grow px-4 overflow-auto'>
                {driverSeasons}
            </div>
                <ChangePageButtonRight onClickFn={() => changePage(1)} disabledVar={lastPage} />
            </div>
        </div>
    )
}

export default OtherDriverPanel;