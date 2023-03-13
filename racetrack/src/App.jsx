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
      </Provider>
    )
}

export default App