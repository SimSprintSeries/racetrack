import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home.jsx";
import {Login} from "./Login";
import StatsPanel from "../pages/statsPanel.tsx";
import DriverPanel from "../pages/driverPanel/driverPanel";
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
import AdminPanelMain from "../pages/adminPanel/adminPanelMain";
import AdminTrackModule from "../pages/adminPanel/adminPanelTracks";
import ReportView from "../pages/reports/viewReport";
import LeagueReports from "../pages/reports/leagueReports";
import {AdminPanelSeason, AdminPanelSeasonManage} from "../pages/adminPanel/adminPanelSeason";
import AdminPanelSeasonManagePage from "../pages/adminPanel/adminPanelSeasonManage";
import {SendReport} from "../pages/reports/sendReport";
import AdminPanelAddSeason from "../pages/adminPanel/adminPanelAddSeason";

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
                        <Route path='reports' element={<LeagueReports/>}></Route>
                    </Route>
                </Route>
            </Route>
            <Route path='report'>
                <Route path='view/:reportId' element={<ReportView/>}/>
                <Route path='send/:seasonId' element={<SendReport/>}/>
            </Route>
            <Route path='/admin'>
                <Route path='' element={<AdminPanelMain/>}></Route>
                <Route path='trackPanel' element={<AdminTrackModule/>}></Route>
                <Route path='seasonPanel'>
                    <Route path='' element={<AdminPanelSeason/>}></Route>
                    <Route path='addNewSeason' element={<AdminPanelAddSeason/>}></Route>
                    <Route path='manageSeasons' element={<AdminPanelSeasonManage/>}></Route>
                    <Route path='editSeason/:seasonId' element={<AdminPanelSeasonManagePage/>}></Route>
                </Route>
            </Route>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default PageContent;