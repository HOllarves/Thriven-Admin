import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import ClientService from '../../services/client-service'

class InvestmentItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      added: false
    }
    this.clientService = new ClientService()
  }
  deleteInvestment = () => {
    const id = this.props._id
    this.clientService.deleteInvestment(id)
      .then(response => {
        this.props.loadData()
      })
  }
  editInvestment = () => {
    this.props.history.push(`/investments/${this.props._id}`)
  }
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  changeStatus() {
    this.setState({
      added: !this.state.added
    })
  }
  render() {
    const { _id, amount, startDate, endDate, interest, duration, paymentFrequency, showPaymentForm } = this.props
    return (
      <tbody>
        <tr key={_id}>
          <td>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
          }).format(amount)}</td>
          <td>{startDate}</td>
          <td>{endDate}</td>
          <td>{new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(interest / 100)}</td>
          <td>{duration}</td>
          <td>{paymentFrequency}</td>
          <td className="investment-item-actions">
            {showPaymentForm &&
              <div>
                {!this.state.added &&
                  <Button
                    onClick={() => {
                      this.props.addInvestmentToTotal(this.props.investment)
                      this.changeStatus()
                    }}
                    outline color="secondary"
                    size="sm">Agregar</Button>
                }
                {this.state.added &&
                  <Button
                    onClick={() => {
                      this.props.removeFromTotal(this.props._id)
                      this.changeStatus()
                    }}
                    outline color="danger"
                    size="sm">Eliminar</Button>
                }
              </div>
            }
            {!showPaymentForm &&
              <ButtonGroup>
                <Button onClick={this.editInvestment} color="secondary" outline size="sm">Editar</Button>
                <Button onClick={this.toggleModal} color="danger" outline size="sm">Eliminar</Button>
              </ButtonGroup>
            }
          </td>
        </tr>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Eliminar Inversión</ModalHeader>
          <ModalBody>¿Quiere eliminar la inversión?</ModalBody>
          <ModalFooter>
            <Button outline onClick={this.toggleModal} color="secondary">Cancelar</Button>
            <Button outline onClick={this.deleteInvestment} color="danger">Eliminar</Button>
          </ModalFooter>
        </Modal>
      </tbody>
    )
  }
}

export default withRouter(InvestmentItem)
