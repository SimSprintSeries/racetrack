import React from 'react';
import { Nav } from './components/Nav'
import PageContent from "./components/PageContent.jsx";
import {Provider} from "react-redux";
import store from "./store/store.tsx";


const App = () => {
    return (
        <Provider store={store}>
            <div className='h-screen flex flex-col'>
                <Nav/>
                <PageContent/>
            </div>
        </Provider>
    )
}

export default App