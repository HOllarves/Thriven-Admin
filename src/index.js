import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ClientList from './views/Client/List'
import ClientForm from './views/Client/Create'
import Client from './views/Client/Show'
import Receipts from './views/Payment/Show'
import EditInvestment from './views/Investment/Edit'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/clients/:id" component={Client} />
      <Route path="/clients" exact component={ClientForm} />
      <Route path="/receipts" exact component={Receipts} />
      <Route path="/" exact component={ClientList} />
      <Route path="/investments/:id" component={EditInvestment} />
    </App>
  </BrowserRouter>,
  document.getElementById('root'))

registerServiceWorker()
