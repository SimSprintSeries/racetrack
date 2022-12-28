import React, { Component } from "react";
import { LogoBar } from "./components/Logo";
import { Nav } from './components/Nav'
import { Events } from './components/Events'

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <LogoBar />
        <Events />
      </>
    )
  }
}

export default App