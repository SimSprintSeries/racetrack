import React, {Component, useEffect, useState} from "react";

class Events extends Component {
    render() {
        return (
            <div className="flex flex-col justify-center items-center lg:w-[40%] font-thin max-h-[75vh] box-border">
                <Event/>
                <LastEvent/>
            </div>
        )
    }
}

const Event = () => {
    const [nextEventName, setNextEventName] = useState();
    const [nextEventDate, setNextEventDate] = useState();

    useEffect(() => {
        fetch("http://57.128.195.196:8080/api/race?currentPage=0&pageSize=1&sort=startDate&sortDirection=ASC&completed=false", {headers: {Accept: "*/*"}})
            .then(response => response.json())
            .then(result => {
                setNextEventName(result.content[0].split.league.game.name + ' Liga ' + result.content[0].split.name)
                setNextEventDate(result.content[0].startDate)
            } )
            .catch(err => console.log(err))
    }, [])


    return (
        <><div className="text-2xl p-4 pb-12 text-color">Najbliższe wydarzenie</div>
            <div className="flex w-full items-center justify-center">
                <div className=''><div className='bg-bg w-[190px] h-[190px] text-color grid place-content-center rounded-[5px] self-center mr-9'>{nextEventName}</div></div>
                <a href="" className="grid place-content-center text-[24px] text-color w-1/4">Monza {nextEventDate}</a>
            </div></>
    )
}

const LastEvent = () => {
    return (
        <><div className="text-2xl p-16 pb-12 text-color">Ostatnia transmisja</div>
            <div className="flex w-full items-center justify-center">
                <iframe className='aspect-video w-1/2 mb-16' src="https://www.youtube.com/embed/T-qwAJ2CnKM" title='LiveStream' allowFullScreen></iframe>
            </div></>
    )
}

export { Events }