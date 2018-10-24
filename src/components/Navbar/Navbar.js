import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="navbar">
        <div>
          <Link to="/">
            <img src={require('../../assets/images/thriven-logo.png')} alt="thriven logo" className="navbar-thriven-logo" />
          </Link>
        </div>
        <div>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link to="/" className="nav-link">Clientes</Link>
            </li>
            <li className="nav-item">
              <Link to="/clients" className="nav-link">Nuevo Cliente</Link>
            </li>
            <li className="nav-item">
              <Link to="/receipts" className="nav-link">Recibos</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Navbar
