import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import LoadingSpinner from "../../components/loadingSpinner";
import axios from "axios";
import {APIObject} from "../../store/appSlice";
import {Link} from "react-router-dom";

const LeagueReports = () => {

    const {seasonId} = useParams();
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(true)
    const [reportList, setReportList] = useState<[]>([])
    const isUserLogged = useSelector((state: RootState) => state.storeData.isDiscordLogged)

    useEffect(() => {
        axios.get(API_SERVER + '/report', {
            params: {
                currentPage: 0,
                pageSize: 15,
                sort: 'id',
                sortDirection: 'DESC',
                leagueId: seasonId
            }
        })
            .then(response => setReportList(response.data.content.map((item: APIObject) => <ReportListItem key={item.id} {...item}/>)))
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))

    }, [seasonId])

    return (
        <>
            { !isLoading ?
            <div className='grow text-color w-full'>
                { isUserLogged ?
                    <div className='p-8 mb-4 border-b-[1px] border-color/35'><Link to={'/report/send/' + seasonId}
                                                                                className='underline'>Zgłoś
                    incydent</Link></div> : null
                }
                <ul className='p-4 w-full flex flex-col gap-4 justify-center items-center'>{reportList.length ? reportList : 'Brak zgłoszonych incydentów'}</ul>
            </div> : <LoadingSpinner/> }
        </>
    )
}

const ReportListItem = (props: APIObject) => {

    return (
        <li className={`w-full rounded-lg p-4 ${props.checked ? 'bg-green/15' : 'bg-bg/55 '}`}>
            <Link to={'/report/view/' + props.id} className='flex flex-col gap-1'>
                <span className='truncate'>{`Zgłoszenie nr ${props.id} - ${props.race.displayText}`}</span>
                <span className='truncate text-sm text-color/75 ml-4'>{`Zgłaszający: ${props.reportingDriver.nickname} Zgłoszony: ${props.reportedDriver.nickname}`}</span>
            </Link>
        </li>
    )
}

export default LeagueReports;