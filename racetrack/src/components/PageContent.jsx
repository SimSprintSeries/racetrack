import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home.jsx";
import {Login} from "./Login";
import StatsPanel from "../pages/statsPanel.jsx";
import DriverPanel from "../pages/driverPanel/driverPanel";
import EventsPanel from "../pages/seasons/eventsPanel.jsx";
import ActiveSeasons from "../pages/seasons/activeSeasons.jsx";
import ArchiveSeasons from "../pages/seasons/archiveSeasons.jsx";
import ActiveSeasonDetails from "../pages/seasons/activeSeasonDetails.jsx";
import EventDetails from "../pages/seasons/eventDetails.jsx";
import RaceDetails from "../pages/seasons/raceDetails.jsx";
import ActiveSeasonsRaces from "../pages/seasons/activeSeasonRaces.jsx";
import ClassificationDetails from "../pages/seasons/classificationDetails.jsx";
import SeasonDriversDetails from "../pages/seasons/seasonDriversDetails.jsx";
import SeasonRules from "../pages/seasons/seasonRules.jsx";
import {NotFoundPage} from "./NotFoundPage";
import OtherDriverPanel from "../pages/driverPanel/otherDriverPanel";

const PageContent = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/stats' element={<StatsPanel/>} />
            <Route path='/driver'>
                <Route path='' element={<DriverPanel/>}>
                </Route>
                <Route path=':driverId' element={<OtherDriverPanel/>}></Route>
            </Route>
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
                    <Route path=':seasonId' element={<ActiveSeasonDetails/>}>
                        <Route path='races'>
                            <Route path='' element={<ActiveSeasonsRaces/>}></Route>
                            <Route path='event/:eventId' element={<EventDetails/>}></Route>
                            <Route path='race/:raceId' element={<RaceDetails/>}></Route>
                        </Route>
                        <Route path='classification' element={<ClassificationDetails/>}></Route>
                        <Route path='drivers' element={<SeasonDriversDetails/>}></Route>
                        <Route path='rules' element={<SeasonRules/>}></Route>
                    </Route>
                </Route>
            </Route>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default PageContent;