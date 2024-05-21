import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {AdminModuleTile} from "./adminPanelMain";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {APIObject} from "../../store/appSlice";
import {Link} from "react-router-dom";

const AdminPanelSeasonManagePage = () => {

    const {seasonId} = useParams();
    const API_SERVER = useSelector((state: RootState) => state.storeData.apiServer)
    const [seasonRaceList, setSeasonRaceList] = useState([])

    useEffect(() => {
        axios.get( API_SERVER + '/event', {
            params: {
                currentPage: 0,
                pageSize: 20,
                sort: 'startDate',
                leagueId: seasonId
            }
        })
            .then(response => response.data)
            .then(result => setSeasonRaceList(result.content.map((item: APIObject, index: number) => <AdminPanelSeasonRaceItem key={index} {...item}/>)))
    },[seasonId])

    return (
        <div className='grow text-color p-4 flex-wrap'>
            <div className='grid grid-cols-2 gap-4 w-full pb-4 border-b-[1px] border-color/50 '>
                <AdminModuleTile pathTarget={`seasonPanel/editSeason/${seasonId}/editSeasonDetails`} name='Edytuj sezon' icon=''/>
                <AdminModuleTile pathTarget={`seasonPanel/editSeason/${seasonId}/editSeasonDrivers`} name='Edytuj kierowców' icon=''/>
            </div>
            <div>
                {seasonRaceList}
            </div>
        </div>
    )
}

const AdminPanelSeasonRaceItem = (props: APIObject) => {
    return(
        <div className='flex p-2'><span className='grow'>{props.displayText}</span> <Link className='underline-offset-2 underline' to=''>Edytuj</Link></div>
    )
}

export default AdminPanelSeasonManagePage;