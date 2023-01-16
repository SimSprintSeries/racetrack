import React, { Component, useEffect } from 'react';
import { LogoBar } from './components/Logo';
import { Nav } from './components/Nav'
import { Events } from './components/Events'
import { Messages } from './components/Messages'
import { Login } from './components/Login'
import { Routes, Route } from 'react-router-dom';
import { Leagues } from './components/Leagues';

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
      <div className='bg-bg'>
        <Nav />
        <LogoBar />
        <Events />
        <div className='grid grid-cols-2'><Messages/><Leagues/></div>
      </div>
    )
  }
}

export default App