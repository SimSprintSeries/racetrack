import React, { Component, useEffect } from 'react';
import { LogoBar } from './components/Logo';
import { Nav } from './components/Nav'
import { Events } from './components/Events'
import { MessagesSection } from './components/Messages'
import { Login } from './components/Login'
import { Routes, Route} from 'react-router-dom';

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
      <>
        <Nav />
        <LogoBar />
        <Events />
        {MessagesSection}
      </>
    )
  }
}

export default App