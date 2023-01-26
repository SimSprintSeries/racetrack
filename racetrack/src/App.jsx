import React, { Component, useEffect } from 'react';
import { Login } from './components/Login'
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav'
import { InfoBar } from "./components/Info.jsx";
import { Events } from "./components/Events.jsx";
import { Content } from "./components/Content.jsx";


class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </>
    )
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <InfoBar/>
        <Events/>
        <Content/>
      </div>
    )
  }
}

export default App