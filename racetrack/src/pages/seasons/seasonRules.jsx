import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const SeasonRules = () => {
    const [seasonRules, setSeasonRules] = useState()
    const API_SERVER = useSelector(state => state.storeData.apiServer)

    const {seasonId} = useParams()

    useEffect(() => {
        axios.get(API_SERVER + '/league/' + seasonId)
            .then(response => {
                axios.get(API_SERVER + '/rules/' + response.data.game.gameFamily.name.toLowerCase())
                    .then(response => response.data)
                    .then(result => setSeasonRules(result))
            })


    }, [])


    return (
        <div className='w-full p-6 px-12 text-color' >
            <div dangerouslySetInnerHTML={{__html: seasonRules}}></div>
        </div>
    )
}

export default SeasonRules;