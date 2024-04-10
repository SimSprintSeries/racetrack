import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import LoadingSpinner from "../../components/loadingSpinner.jsx";
import {ChangePageButtonLeft, ChangePageButtonRight} from "../../components/changePageButtons";


const ArchiveSeasons = () => {
    const [archiveSeasonsList, setArchiveSeasonsList] = useState()
    const [page, setPage] = useState(0)
    const [nextPageLength, setNextPageLength] = useState(false)
    const API_SERVER = useSelector(state => state.storeData.apiServer)
    const [isLoading, setIsLoading] = useState(true)

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
                setNextPageLength(result.last)
            })
            .then(() => setIsLoading(false))

    }, [page])

    const changePage = x => {
        setPage(page+x);
    }

    return (
        <>
            { !isLoading ? <div className='flex flex-col text-color w-full p-8 pt-0 grow'>
                <h1 className='text-center text-2xl mb-4'>Archiwalne sezony</h1>
                <ul className='list-disc list-outside grow'>{archiveSeasonsList}</ul>
                <div className='w-full flex gap-12 items-center justify-center p-4'>
                    <ChangePageButtonLeft disabledVar={!page} onClickFn={() => changePage(-1)}/>
                    <ChangePageButtonRight disabledVar={nextPageLength} onClickFn={() => changePage(1)}/>
                </div>
            </div> : <LoadingSpinner/>}
        </>
    )
}

export default ArchiveSeasons;