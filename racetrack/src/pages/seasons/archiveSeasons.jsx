import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {useSelector} from "react-redux";


const ArchiveSeasons = () => {
    const [archiveSeasonsList, setArchiveSeasonsList] = useState()
    const [page, setPage] = useState(0)
    const [nextPageLength, setNextPageLength] = useState(1)
    const API_SERVER = useSelector(state => state.storeData.apiServer)

    useEffect(() => {
        axios.get(API_SERVER + '/league', {
            params: {
                currentPage: page,
                pageSize: 20,
                sort: 'startDate',
                sortDirection: 'DESC',
                active: false
            }
        })
            .then(response => response.data)
            .then(result => {
                setArchiveSeasonsList(result.content.map(item => <li key={item.id} className='my-2 truncate'><Link to={'/events/season/'+ item.id + '/races'}>{item.name}</Link></li>))
                return result.content.length
            })
            .then(result => result < 20 ? setNextPageLength(0) : setNextPageLength(1))

    }, [page])

    const changePage = x => {
        setPage(page+x);
    }

    return (
        <div className='flex flex-col text-color w-full h-screen p-8 pt-0'>
            <h1 className='text-center text-2xl mb-4'>Archiwalne sezony</h1>
            <ul className='list-disc list-outside'>{archiveSeasonsList}</ul>
            <div className='w-full flex gap-12 items-center justify-center grow'>
                <button onClick={() => changePage(-1)} className='py-2 px-4 border-color border-[1px] rounded-2xl disabled:opacity-50' disabled={!page}>Poprzednia</button>
                <button onClick={() => changePage(1)} className='py-2 px-4 border-color border-[1px] rounded-2xl disabled:opacity-50' disabled={!nextPageLength}>Następna</button>
            </div>
            </div>
    )
}

export default ArchiveSeasons;