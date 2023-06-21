import React from 'react';
import { Nav } from './components/Nav'
import PageContent from "./components/PageContent.jsx";
import {Provider} from "react-redux";
import store from "./store/store.jsx";


const App = () => {
    return (
      <Main/>
    )
}

const Main = () => {
    return (
      <Provider store={store}>
        <Nav/>
        <PageContent/>
        <footer className='absolute w-full p-2 text-color/50 bottom-0'><p className='w-full text-center'>Copyrights by SSS</p></footer>
      </Provider>
    )
}

export default App