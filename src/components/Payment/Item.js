import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import ClientService from '../../services/client-service'
import EmailService from '../../services/email-service'
import EmailTemplate from '../Email/Receipt'

class Receipt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investments: [],
      modal: false,
      error: false
    }
    this.clientService = new ClientService()
    this.emailService = new EmailService()
  }
  continue = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  accept = () => {
    this.setState({
      error: !this.state.error
    })
  }
  sendMail = () => {
    const id = this.props.id
    this.clientService.getPaymentById(id)
      .then(response => {
        if (response.success) {
          const receipt = response.data
          let investments = []
          let investmentRequests = []
          response.data.investments.forEach(id => {
            investmentRequests.push(this.clientService.getClientByInvestment(id))
          })
          let email
          this.clientService.getClientById(receipt.clientId)
            .then(response => {
              email = response.data.email
              Promise.all(investmentRequests)
                .then(data => {
                  data.forEach(response => {
                    investments.push(response.data)
                  })
                  let html = ReactDOMServer.renderToStaticMarkup(
                    <EmailTemplate
                      investments={investments}
                      email={email}
                      date={receipt.date}
                      paymentNumber={receipt.paymentNumber}
                      name={receipt.name}
                      lastName={receipt.lastName}
                      totalAmount={receipt.amount}
                    />
                  )
                  const emailData = { html, email }
                  this.emailService.sendMail(emailData)
                    .then(response => {
                      if (response.success) {
                        this.setState({
                          modal: !this.state.modal
                        })
                      } else if (response.error) {
                        this.setState({
                          error: true
                        })
                      }
                    })
                })
                .catch(err => {
                  console.log(err)
                })
            })
        }
      })
  }
  render() {
    return (
      <tr className="title">
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Aviso</ModalHeader>
          <ModalBody>El email ha sido enviado correctamente</ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.continue}>Aceptar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.error}>
          <ModalHeader>Error</ModalHeader>
          <ModalBody className="danger">No se ha podido enviar el email</ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.accept}>Aceptar</Button>
          </ModalFooter>
        </Modal>
        <td>{this.props.lastName.charAt(0).toUpperCase() + this.props.lastName.substr(1).toLowerCase()}</td>
        <td>{this.props.name.charAt(0).toUpperCase() + this.props.name.substr(1).toLowerCase()}</td>
        <td className="sub-title">{new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2
        }).format(this.props.amount)}</td>
        <td className="sub-title">{this.props.date}</td>
        <td>{this.props.methodOfPayment.charAt(0).toUpperCase() + this.props.methodOfPayment.substr(1).toLowerCase()}</td>
        <td>{this.props.description.charAt(0).toUpperCase() + this.props.description.substr(1).toLowerCase()}</td>
        <td onClick={this.sendMail}><Button outline color="secondary" size="sm">Enviar Email</Button></td>
      </tr>
    )
  }
}

export default withRouter(Receipt)
