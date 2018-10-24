import React, { Component } from 'react'
import ClientService from '../../services/client-service'
import { Button, ButtonGroup, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap'

class InvestmentForm extends Component {
  constructor(props) {
    super(props)
    this.clientService = new ClientService()
    this.state = {
      startDate: {},
      error: false
    }
  }
  handleChange(name, value) {
    this.setState({
      [name]: value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.amount || !this.state.startDate || !this.state.interest || !this.state.duration || !this.state.paymentFrequency) {
      return this.setState({
        error: true
      })
    }
    const { amount, startDate, interest, duration, paymentFrequency } = this.state
    const clientId = this.props.id
    const data = { clientId, amount, startDate, interest, duration, paymentFrequency }
    this.clientService.addInvestment(data)
      .then(response => {
        this.props.loadData()
        this.props.show()
      })
  }
  cancel = () => {
    this.props.show()
  }
  render() {
    return (
      <div>
        <h3>Nueva Inversión</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="client-id">Id Cliente</Label>
            <Input type="text" id="client-id" name="id" value={this.props.id} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="amount">Monto</Label>
            <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="number" step="0.01" id="amount" name="amount" placeholder="Monto" />
          </FormGroup>
          <FormGroup>
            <Label for="interest">Tasa</Label>
            <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="number" step="0.01" id="interest" name="interest" placeholder="Tasa" />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Fecha Inicio</Label>
            <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="date" id="startDate" name="startDate" placeholder="Fecha Inicio" />
          </FormGroup>
          <FormGroup>
            <Label for="duration">Duración</Label>
            <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="number" id="duration" name="duration" placeholder="Duración" />
            <FormText>meses</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="paymentFrequency">Frecuencia de Pago</Label>
            <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="number" id="paymentFrequency" name="paymentFrequency" placeholder="Frecuencia de Pago" />
            <FormText>meses</FormText>
          </FormGroup>
          {this.state.error && <Alert color="danger">Debe rellenar todos los campos</Alert>}
          <ButtonGroup>
            <Button outline color="secondary">Crear</Button>
            <Button outline onClick={this.cancel} color="danger">Cancelar</Button>
          </ButtonGroup>
        </Form>
      </div>
    )
  }
}

export default InvestmentForm
