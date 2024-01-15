import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";


const ArchiveSeasons = () => {
    const [archiveSeasonsList, setArchiveSeasonsList] = useState()
    const [page, setPage] = useState(0)
    const [nextPage, setNextPage] = useState(1)
    const [nextPageLength, setNextPageLength] = useState(1)

    useEffect(() => {
        fetch( 'http://57.128.195.196:8080/api/league?currentPage=' + page + '&pageSize=20&sort=startDate&sortDirection=DESC&active=false', {headers: {Accept: "*/*"}})
            .then(response => response.json())
            .then(result => setArchiveSeasonsList(result.content.map(item => <li key={item.id} className='my-2 truncate'><Link to={'/events/season/'+ item.id}>{item.name}</Link></li>)))
        fetch( 'http://57.128.195.196:8080/api/league?currentPage=' + nextPage + '&pageSize=20&sort=startDate&sortDirection=DESC&active=false', {headers: {Accept: "*/*"}})
            .then(response => response.json())
            //.then(result => result.content.length ? setNextPage(false) : setNextPage(true))
            .then(result => setNextPageLength(result.content.length))
    }, [page])

    const changePage = x => {
        setPage(page+x);
        setNextPage(page + x + 1)
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