import React, { Component } from 'react'
import Navbar from './components/Navbar/Navbar'

class App extends Component {
  render() {
    return(
      <div className="container-fluid main-container">
        <Navbar />
        { this.props.children }
      </div>
   )
  }
}

export default App
