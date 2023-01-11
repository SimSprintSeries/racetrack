import React, { Component } from "react";
import { LogoBar } from "./components/Logo";
import { Nav } from './components/Nav'
import { Events } from './components/Events'
import { MessagesSection } from './components/Messages'

class App extends Component {
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