import React, { Component } from 'react'
import ClientService from '../../services/client-service'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup, Form, FormGroup, Label, Input, Alert, Col, Row } from 'reactstrap'
import Loading from '../Loader/Loader'

class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
    this.clientService = new ClientService()
  }
  handleChange(name, value) {
    this.setState({
      [name]: value
    })
  }
  componentWillMount() {
    this.setState({
      name: this.props.name,
      lastName: this.props.lastName,
      total: this.props.total
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.name || !this.state.lastName || !this.state.methodOfPayment || !this.state.description || !this.state.date) {
      return this.setState({
        error: true
      })
    }
    const { name, lastName, methodOfPayment, description, date } = this.state
    const amount = this.props.total
    const clientId = this.props.id
    const investments = this.props.investments
    const data = { clientId, name, lastName, amount, investments, methodOfPayment, description, date }
    this.clientService.makePayment(data)
      .then(response => {
        if (response.success) {
          this.props.showPaymentForm()
          this.props.history.push('/receipts')
        }
      })
  }
  cancel = () => {
    this.props.showPaymentForm()
  }
  render() {
    if (!this.state.name) {
      return (
        <Row className="loader">
          <Col lg={1} className="mx-auto">
            <Loading type="Bars" color="#858E97" />
          </Col>
        </Row>
      )
    }
    return (
      <div>
        <h3>Nuevo Pago</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="clientId">Id Cliente</Label>
            <Input type="text" id="clientId" name="clientId" value={this.props.id} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input type="text" id="name" name="name" value={this.state.name} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Apellido</Label>
            <Input type="text" id="lastName" name="lastName" value={this.state.lastName} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="amount">Monto</Label>
            <Input type="number" id="amount" name="amount" step="0.01" value={this.props.total} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="method">Método de Pago</Label>
            <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="text" id="method" name="methodOfPayment" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Concepto</Label>
            <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="textarea" id="description" name="description" />
          </FormGroup>
          <FormGroup>
            <Label for="date">Fecha</Label>
            <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="date" id="date" name="date" />
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

export default withRouter(PaymentForm)
