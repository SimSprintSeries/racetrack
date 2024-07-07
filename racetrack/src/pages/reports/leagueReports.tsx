import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import LoadingSpinner from "../../components/loadingSpinner";
import axios from "axios";
import {APIObject} from "../../store/appSlice";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const LeagueReports = () => {

    const {seasonId} = useParams();
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(true)
    const [reportList, setReportList] = useState([])
    const isUserLogged = useSelector((state: RootState) => state.storeData.isDiscordLogged)
    const stewardCheck = useSelector((state: RootState) => state.storeData.userData.isSteward)
    const [isMore, setIsMore] = useState(false)
    const [page, setPage] = useState(0)

    useEffect(() => {
        axios.get(API_SERVER + '/report', {
            params: {
                currentPage: page,
                pageSize: 15,
                sort: 'id',
                sortDirection: 'DESC',
                checked: stewardCheck ? null : true,
                leagueId: seasonId
            }
        })
            //.then(response => setReportList(response.data.content.map((item: APIObject) => <ReportListItem key={item.id} {...item}/>)))\
            .then(response => response.data)
            .then(result => {
                setIsMore(!result.last)
                setReportList(result.content)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))

    }, [seasonId, stewardCheck])


    //funkcja dla infiniteScroll'a na załadowanie większej ilości zgłoszeń
    function loadMoreReports() {
        setPage(page+1)

        axios.get(API_SERVER + '/report', {
            params: {
                currentPage: page + 1,
                pageSize: 15,
                sort: 'id',
                sortDirection: 'DESC',
                checked: stewardCheck ? null : true,
                leagueId: seasonId
            }
        })
            .then(response => response.data)
            .then(result => {
                setIsMore(!result.last)
                setReportList(reportList.concat(result.content))
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            { !isLoading ?
            <div className='grow text-color w-full '>
                { isUserLogged ?
                    <div className='p-8 mb-4 border-b-[1px] border-color/35'><Link to={'/report/send/' + seasonId}
                                                                                className='underline'>Zgłoś
                    incydent</Link></div> : null
                }

                <InfiniteScroll className='p-4 px-7 w-full flex flex-col gap-4 justify-center items-center list-none'  next={loadMoreReports} hasMore={isMore} loader={<h1 className='text-center'><LoadingSpinner/></h1>} dataLength={reportList.length}>
                    {reportList.map((item: APIObject) => <ReportListItem key={item.id} {...item}/>)}
                </InfiniteScroll>
                {/*<ul className='p-4 w-full flex flex-col gap-4 justify-center items-center'>{reportList.length ? reportList : 'Brak ocenionych incydentów'}</ul>*/}
            </div> : <LoadingSpinner/> }
        </>
    )
}

// Kafelek wyświetlający zgłoszenie
const ReportListItem = (props: APIObject) => {

    return (
        <li className={`w-full rounded-lg p-4 backdrop-blur-sm bg-gradient-to-l ${props.checked ? 'from-green/40 to-pink-950/10' : '  from-green/10 via-blue-400/10 to-pink-950/10 '}`}>
            <Link to={'/report/view/' + props.id} className='flex flex-col gap-1'>
                <span className='truncate'>{`Zgłoszenie nr ${props.id} - ${props.race.displayText}`}</span>
                <span className='truncate text-sm text-color/75 ml-4'>{`Zgłaszający: ${props.reportingDriver.nickname} Zgłoszony: ${props.reportedDriver.nickname}`}</span>
            </Link>
        </li>
    )
}

export default LeagueReports;