import React, {useEffect, useState} from "react";

const eloPageSize = 12;

const StatsPanel = () => {

    return (
        <div className='text-color'>
            <EloTab/>
        </div>
    )
}

const EloTab = () => {
    const [eloRank, setEloRank] = useState([])
    const [eloPage, setEloPage] = useState(0)


    const changeEloPage = number => {
        setEloPage(eloPage + number)
    }

    return (
        <div>
            <h1>Elo ranking</h1>
            <div></div>
            <div>{eloRank}</div>
            <div>
                <button onClick={() => changeEloPage(-1)}>Poprzednia</button>
                <button onClick={() => changeEloPage(1)}>Następna</button>
            </div>
        </div>
    )
}

export default StatsPanel;