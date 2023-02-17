import React, { Component, useEffect } from 'react';
import { Login } from './components/Login'
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav'
import PageContent from "./components/PageContent.jsx";


class App extends Component {
  render() {
    return (
      <Main/>
    )
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <PageContent/>
      </div>
    )
  }
}

export default App