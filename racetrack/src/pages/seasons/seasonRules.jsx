import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const SeasonRules = () => {
    const [seasonRules, setSeasonRules] = useState()

    const {seasonId} = useParams()

    useEffect(() => {
        axios.get('http://57.128.195.196:8080/api/league/' + seasonId)
            .then(response => {
                axios.get('http://57.128.195.196:8080/api/rules/' + response.data.game.gameFamily.name.toLowerCase())
                    .then(response => response.data)
                    .then(result => setSeasonRules(result))
            })


    }, [])


    return (
        <div className='w-full h-screen p-6 text-color bg:none' dangerouslySetInnerHTML={{__html: seasonRules}}>

        </div>
    )
}

export default SeasonRules;