import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home.jsx";
import {Login} from "./Login";
import StatsPanel from "../pages/statsPanel.jsx";
import DriverPanel from "../pages/driverPanel.jsx";
import EventsPanel from "../pages/eventsPanel.jsx";

const PageContent = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/stats' element={<StatsPanel/>} />
            <Route path='/driver' element={<DriverPanel/>} />
            <Route path='/events' element={<EventsPanel/>} />
        </Routes>
    )
}

export default PageContent;