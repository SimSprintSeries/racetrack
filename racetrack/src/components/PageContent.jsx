import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home.jsx";
import Contact from "../pages/Contact.jsx";
import {Login} from "./Login";

const PageContent = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/discord' element={<Contact/>}/>
        </Routes>
    )
}

export default PageContent;