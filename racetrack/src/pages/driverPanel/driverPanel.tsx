import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {IUserData, APIObject} from "../../store/appSlice";
import axios from "axios";
// @ts-ignore
import LoadingSpinner from "../../components/loadingSpinner";
import {Link} from "react-router-dom";
import {ChangePageButtonLeft, ChangePageButtonRight} from "../../components/changePageButtons";

const DriverPanel = () => {

    const userData: IUserData = useSelector((state: RootState) => state.storeData.userData)
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [driverStats, setDriverStats] = useState<APIObject>({})
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        if(userData.driverId !== 0) {
            axios.get(API_SERVER + '/driver/' + userData.driverId)
                .then(response => setDriverStats(response.data))
                .then(() => {

                })
                .then(() => setIsLoading(false))
                .catch(ex => console.log(ex))
        }
    }, [userData.driverId !== 0])

    return (
        <>
            { !isLoading ? <div className='flex flex-col text-color grow m-4 border-l-[1px] border-color/35 gap-y-4 animate-slideUp'>
                <DriverMainInfo {...userData}/>
                <DriverRaceStats {...driverStats}/>
                <DriverElo {...driverStats}/>
                <DriverSeasons driverId={userData.driverId} api={API_SERVER}/>
                <DriverReports driverId={userData.driverId} api={API_SERVER}/>
            </div> : <LoadingSpinner/>}
        </>
    )
}

const DriverMainInfo = (props: IUserData) => {
    return (
        <div className='text-2xl px-6 py-3 bg-bg/55 flex gap-x-3 items-center rounded-r-lg backdrop-blur-sm'>
            <img className="w-16 h-16 rounded-full ring-2 ring-color"
                 src={`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}.png?size=160`} alt="Bordered avatar" />
            <div>{props.displayName}</div>
        </div>
    )
}

const DriverRaceStats = (props: APIObject) => {

    const tileStyle = 'bg-bg/65 p-3 flex flex-col rounded'

    return (
        <div className='bg-bg/55 rounded-r-lg'>
            <div className='px-4 pt-4 '>
                <span className='text-sm text-color/75'>Statystyki</span>
            </div>
                <div className='grid grid-cols-3 grid-rows-2 px-4 py-4 gap-1 backdrop-blur-sm'>
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

const DriverElo = (props: APIObject) => {

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
        <div className='px-4 pt-4 bg-bg/55 rounded-r-lg backdrop-blur-sm'>
            <span className='text-sm text-color/75'>Elo</span>
            <div className=' py-4 flex overflow-auto gap-x-2'>
                {gameElo.length ? gameElo : <span className='font-thin text-center w-full'>Brak elo do wyświetlenia</span>}
            </div>
        </div>
    )
}

const DriverSeasons = (props: {driverId: number, api: string}) => {

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
        <div className='px-4 pt-4 bg-bg/55 rounded-r-lg backdrop-blur-sm'>
            <span className='text-sm text-color/75'>Moje sezony</span>
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

const DriverReports = (props: {driverId: number, api: string}) => {

    const [page, setPage] = useState<number>(0)
    const [driverReports, setDriverReports] = useState<[]>([])
    const [lastPage, setLastPage] = useState<boolean>(false)
    const pageSize = 5

    useEffect(() => {
        axios.get(props.api + '/report', {
            params: {
                currentPage: page,
                pageSize,
                sort: 'reportDate',
                sortDirection: 'DESC',
                reportingDriverId: props.driverId
            }
        })
            .then(response => {
                setDriverReports(response.data.content.map((item: APIObject) => <Link className='truncate my-1'
                                                                                      key={item.id}
                                                                                      to={'/report/view/' + item.id}>[{item.reportedDriver.nickname}]
                    - {item.race.displayText}</Link>))
                setLastPage(response.data.last)
            })
    }, [props.driverId !== 0, page])

    const changePage = (x: number) => {
        setPage(page+x);
    }

    return (
        <div className='px-4 pt-4 bg-bg/55 rounded-r-lg backdrop-blur-sm'>
            <span className='text-sm text-color/75'>Moje zgłoszenia</span>
            <div className='px-0 py-4 flex min-h-[12em]'>
                <ChangePageButtonLeft onClickFn={() => changePage(-1)} disabledVar={!page} />
                <div className='flex flex-col grow px-4 '>
                    {driverReports.length ? driverReports : 'Brak zgłoszeń'}
                </div>
                <ChangePageButtonRight onClickFn={() => changePage(1)} disabledVar={lastPage} />
            </div>
        </div>
    )
}

export default DriverPanel;