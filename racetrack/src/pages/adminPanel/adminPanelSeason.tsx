import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AdminModuleTile} from "./adminPanelMain";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../../components/loadingSpinner";
import {APIObject} from "../../store/appSlice";

export const AdminPanelSeason = () => {

    const adminCheck = useSelector((state: RootState) => state.storeData.userData.isAdmin)

    return (
        <div className='grow text-color p-4 flex-wrap'>
            { adminCheck ? <div className='grid grid-cols-2 gap-4 w-full'>
                <AdminModuleTile pathTarget='addNewSeason' name='Dodaj sezon' icon=''/>
                <AdminModuleTile pathTarget='seasonPanel/manageSeasons' name='Zarządzaj sezonami' icon=''/>
            </div> : <div className='grow flex justify-center items-center text-2xl font-thin'>Brak uprawnień</div>}
        </div>
    )
}

export const AdminPanelSeasonManage = () => {

    const adminCheck = useSelector((state: RootState) => state.storeData.userData.isAdmin)
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [seasonsList, setSeasonsList] = useState([])
    const [page, setPage] = useState(0)
    const [isMore, setIsMore] = useState(false)

    useEffect(() => {
        axios.get(API_SERVER + '/league', {
            params: {
                currentPage: page,
                pageSize: 30,
                sort: 'startDate',
                sortDirection: 'DESC'
            }
        })
            .then(response => response.data)
            .then(result => {
                setIsMore(!result.last)
                setSeasonsList(result.content)
            })
    }, [])

    const loadMoreSeasons = () => {
        setPage(page + 1)

        axios.get(API_SERVER + '/league', {
            params: {
                currentPage: page,
                pageSize: 30,
                sort: 'startDate',
                sortDirection: 'DESC'
            }
        })
            .then(response => response.data)
            .then(result => {
                setIsMore(!result.last)
                setSeasonsList(seasonsList.concat(result.content))
            })
    }

    return (
        <div>
            { adminCheck ? <InfiniteScroll className='text-color' next={loadMoreSeasons} hasMore={isMore}
                             loader={<h1 className='text-center'><LoadingSpinner/></h1>}
                             dataLength={seasonsList.length}>

                {seasonsList.map((item: APIObject, index) => <SeasonListItem key={index} {...item}></SeasonListItem>)}

            </InfiniteScroll> : <div className='text-color grow flex justify-center items-center text-2xl font-thin'>Brak uprawnień</div>}

        </div>
    )
}

const SeasonListItem = (props: APIObject) => {
    return (
        <div className='p-4 flex'>
            <span className='w-2/3 truncate'>{props.name}</span>
            <span className='grow flex justify-center underline'><Link to={'/admin/seasonPanel/editSeason/' + props.id}>Zarządzaj</Link></span>
        </div>
    )
}