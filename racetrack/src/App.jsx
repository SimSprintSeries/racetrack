import React, { Component } from "react";
import { LogoBar } from "./components/Logo";
import { Nav } from './components/Nav'

class App extends Component {
  render() {
    return (
      <>
        <Nav />
        <LogoBar />
      </>
    )
  }
}

export default App