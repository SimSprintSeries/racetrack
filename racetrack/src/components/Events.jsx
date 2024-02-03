import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";

class Events extends Component {
    render() {
        return (
            <div className="flex flex-col justify-center items-center lg:w-1/2 font-thin">
                <Event/>
                <LastEvent/>
            </div>
        )
    }
}

const Event = () => {
    const [nextEventName, setNextEventName] = useState();
    const API_SERVER = useSelector(state => state.storeData.apiServer)

    useEffect(() => {
        axios.get(API_SERVER + '/race', {
            params: {
                currentPage: 0,
                pageSize: 1,
                sort: 'startDate',
                sortDirection: 'DESC',
                completed: false
            },
            headers: {
                'Access-Control-Allow-Origin' : true
            }
        })
            .then(response => response.data)
            .then(result =>
                setNextEventName(result.content.map(item => item))
             )
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="text-2xl p-4 pb-12 text-color text-center">Najbliższe wydarzenie</div>
            <div className="flex w-full items-center justify-center">
                <div className=''>
                    <div
                        className='bg-bg w-[190px] h-[190px] text-color grid place-content-center rounded-[5px] self-center mr-9'>{nextEventName ? nextEventName[0].split.league.name : null}</div>
                </div>
                <div className="grid place-content-center text-xl text-color w-1/4">{nextEventName ? new Date(nextEventName[0].startDate).toLocaleDateString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'UTC'
                }) : null}</div>
            </div>
        </div>
    )
}

const LastEvent = () => {
    return (
        <div>
            <div className="text-2xl p-16 pb-12 text-color">Najnowsza transmisja</div>
            <div className="flex w-full items-center justify-center">
                <iframe className='aspect-video w-5/6 lg:w-full mb-16' src="https://www.youtube.com/embed?listType=playlist&list=UUHA2AJ3bbWxc2ccIB1EF5ug" title='LiveStream' allowFullScreen></iframe>
            </div>
        </div>
    )
}

export { Events }