import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ClientItem extends Component {
  onClick = () => {
    this.props.history.push(`/clients/${this.props.id}`)
  }
  render() {
    const { id, name, lastName, email, date } = this.props
    return (
      <tr onClick={this.onClick} key={id} className="client-item">
        <td>{lastName.charAt(0).toUpperCase() + lastName.substr(1).toLowerCase()}</td>
        <td>{name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()}</td>
        <td>{email}</td>
        <td>{date}</td>
      </tr>
    )
  }
}

export default withRouter(ClientItem)
