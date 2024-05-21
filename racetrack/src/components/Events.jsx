import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";

class Events extends Component {
    render() {
        return (
            <div className="flex flex-col lg:flex-row min-w-full justify-center items-center lg:w-1/2 font-thin">
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
        <div className='grow'>
            <div className="text-2xl p-4 pb-12 text-color text-center">Najbliższe wydarzenie</div>
            <div className="flex w-full items-center justify-center">
                <div className=''>
                    <div
                        className='relative flex w-[190px] h-[190px] text-color justify-center items-center rounded-lg mr-9 bg-bg/35 overflow-hidden'
                        >
                        <span className='z-20 text-center'>{nextEventName ? nextEventName[0].split.league.name : null}</span>
                        <div
                            className='w-full h-full absolute top-0 left-0 bg-center bg-cover z-10 opacity-30'
                            style={{'backgroundImage': `url('${nextEventName ? nextEventName[0].split.league.banner : null}')`}}></div>
                        </div>
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
        <div className='flex flex-col lg:grow m-auto'>
            <div className="text-2xl p-16 pb-12 text-color text-center">Ostatnia transmisja</div>
            <div className="flex w-full items-center justify-center">
                <iframe className='aspect-video w-5/6 mb-16 shadow-black/50 ' src="https://www.youtube.com/embed?listType=playlist&list=UUHA2AJ3bbWxc2ccIB1EF5ug" title='LiveStream' allowFullScreen></iframe>
            </div>
        </div>
    )
}

export { Events }