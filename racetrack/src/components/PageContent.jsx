import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home.jsx";
import {Login} from "./Login";
import StatsPanel from "../pages/statsPanel.jsx";
import DriverPanel from "../pages/driverPanel.jsx";
import EventsPanel from "../pages/eventsPanel.jsx";
import ActiveSeasons from "../pages/activeSeasons.jsx";
import ArchiveSeasons from "../pages/archiveSeasons.jsx";
import ActiveSeasonDetails from "../pages/activeSeasonDetails";
import EventDetails from "../pages/eventDetails.jsx";
import RaceDetails from "../pages/raceDetails.jsx";

const PageContent = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/stats' element={<StatsPanel/>} />
            <Route path='/driver' element={<DriverPanel/>} />
            <Route path='/events'>
                <Route index={true} element={<EventsPanel/>}></Route>
                <Route path='activeSeasons' >
                    <Route path='' element={<ActiveSeasons/>}></Route>
                </Route>
                <Route path='archiveSeasons'>
                    <Route path='' element={<ArchiveSeasons/>}>
                    </Route>
                </Route>
                <Route path='season'>
                    <Route path=':seasonId'>
                        <Route path='' element={<ActiveSeasonDetails/>}></Route>
                        <Route path='event/:eventId' element={<EventDetails/>}></Route>
                        <Route path='race/:raceId' element={<RaceDetails/>}></Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default PageContent;