import React from 'react';
import { Nav } from './components/Nav'
import PageContent from "./components/PageContent.jsx";
import {Provider} from "react-redux";
import store from "./store/store.tsx";


const App = () => {
    return (
        <Provider store={store}>
            <div id='mainContainer' className='min-h-screen flex flex-col overflow-hidden'>
                <Nav/>
                <PageContent/>
            </div>
        </Provider>
    )
}

export default App