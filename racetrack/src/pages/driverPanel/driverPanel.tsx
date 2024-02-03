import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {IUserData} from "../../store/appSlice";
import axios from "axios";
// @ts-ignore
import LoadingSpinner from "../../components/loadingSpinner";

interface IDriverStats {wins: number, podiums: number, top10: number, dnfs: number, dsqs: number, fastestLaps: number}

const DriverPanel = () => {

    const userData: IUserData = useSelector((state: RootState) => state.storeData.userData)
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [driverStats, setDriverStats] = useState<IDriverStats>({wins: 0, podiums: 0, top10: 0, dnfs: 0, dsqs: 0, fastestLaps: 0})
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if(userData.driverId !== 0) {
            axios.get(API_SERVER + '/stats', {
                params: {
                    driverId: userData.driverId
                }
            })
                .then(response => setDriverStats(response.data))
                .then(() => setIsLoading(false))
        }
    }, [userData.driverId !== 0])

    return (
        <>
            { !isLoading ? <div className='text-color grow'>
                <DriverMainInfo {...userData}/>
                <DriverRaceStats {...driverStats}/>
            </div> : <LoadingSpinner/>}
        </>
    )
}

const DriverMainInfo = (props: IUserData) => {
    return (
        <div className='text-2xl px-6 py-3 bg-bg/65 flex gap-x-3 items-center'>
            <img className="w-16 h-16 rounded-full ring-2 ring-color"
                 src={`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}.png?size=160`} alt="Bordered avatar" />
            <div>{props.displayName}</div>
        </div>
    )
}

const DriverRaceStats = (props: IDriverStats) => {

    const tileStyle = 'bg-bg/65 p-3 flex flex-col rounded'

    return (
        <>
            <div className='px-4 pt-4'>
                <span className='text-sm text-color/75'>Statystyki</span>
            </div>
                <div className='grid grid-cols-3 grid-rows-2 px-4 py-4 gap-1 border-b-[1px]'>
                <div className={tileStyle}><span className='text-sm text-color/85'>Wins: </span><span className='text-lg text-right font-bold mt-1'>{props.wins}</span></div>
                <div className={tileStyle}><span className='text-sm text-color/85'>Podium: </span><span className='text-lg text-right font-bold mt-1'>{props.podiums}</span></div>
                <div className={tileStyle}><span className='text-sm text-color/85'>Top 10: </span><span className='text-lg text-right font-bold mt-1'>{props.top10}</span></div>
                <div className={tileStyle}><span className='text-sm text-color/85'>Fastest Laps: </span><span className='text-lg text-right font-bold mt-1'>{props.fastestLaps}</span></div>
                <div className={tileStyle}><span className='text-sm text-color/85'>DNF: </span><span className='text-lg text-right font-bold mt-1'>{props.dnfs}</span></div>
                <div className={tileStyle}><span className='text-sm text-color/85'>DSQ: </span><span className='text-lg text-right font-bold mt-1'>{props.dsqs}</span></div>
            </div>
        </>
    )
}

export default DriverPanel;