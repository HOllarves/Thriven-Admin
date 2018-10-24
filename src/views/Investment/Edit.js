import React, { Component } from 'react'
import { Col, Row, Button, ButtonGroup, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import ClientService from '../../services/client-service'
import Loading from '../../components/Loader/Loader'

class EditInvestment extends Component {
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
  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.amount || !this.state.startDate || !this.state.endDate || !this.state.interest || !this.state.duration || !this.state.paymentFrequency) {
      return this.setState({
        error: true
      })
    }
    const { amount, startDate, endDate, interest, duration, paymentFrequency } = this.state
    const id = this.state.investment._id
    const data = { id, amount, startDate, endDate, interest, duration, paymentFrequency }
    this.clientService.editInvestment(id, data)
      .then(response => {
        if (response.success) {
          let client = response.data
          this.props.history.push(`/clients/${client._id}`)
        }
      })
  }
  cancel = () => {
    this.props.history.goBack()
  }
  componentWillMount() {
    const id = this.props.match.params.id
    this.clientService.getClientByInvestment(id)
      .then(response => {
        if (response.success) {
          const investment = response.data
          const startDate = response.data.startDate.substring(0, 10)
          const endDate = response.data.endDate.substring(0, 10)
          const interest = response.data.interest
          const duration = response.data.duration
          const amount = response.data.amount
          const paymentFrequency = response.data.paymentFrequency
          this.setState({
            investment,
            startDate,
            endDate,
            interest,
            duration,
            amount,
            paymentFrequency
          })
        }
      })
  }
  render() {
    const { investment, startDate, endDate, amount, duration, interest, paymentFrequency } = this.state
    if (!this.state.investment) {
      return (
        <Row className="loader">
          <Col lg={1} className="mx-auto">
            <Loading type="Bars" color="#858E97" />
          </Col>
        </Row>
      )
    }
    return (
      <Row>
        <Col lg={8} className="mx-auto investment-edit-container">
          <h1>Inversión</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="investment-id">Id</Label>
              <Input type="text" id="investment-id" name="id" value={investment._id} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="amount">Monto</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} value={amount} type="number" step="0.01" id="amount" name="amount" placeholder="Monto" />
            </FormGroup>
            <FormGroup>
              <Label for="interest">Tasa</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} value={interest} type="number" step="0.01" id="interest" name="interest" placeholder="Tasa" />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Fecha Inicio</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="date" id="startDate" name="startDate" placeholder="Fecha Inicio" value={startDate} />
            </FormGroup>
            <FormGroup>
              <Label for="duration">Duración</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="number" id="duration" name="duration" placeholder="Duración" value={duration} />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">Fecha Fin</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="date" id="endDate" name="endDate" placeholder="Fecha Fin" value={endDate} />
            </FormGroup>
            <FormGroup>
              <Label for="paymentFrequency">Frecuencia de Pago</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="number" id="paymentFrequency" name="paymentFrequency" placeholder="Frecuencia de Pago" value={paymentFrequency} />
            </FormGroup>
            {this.state.error && <Alert color="danger">Debe rellenar todos los campos</Alert>}
            <ButtonGroup>
              <Button outline color="secondary">Guardar</Button>
              <Button outline color="danger" onClick={this.cancel}>Cancelar</Button>
            </ButtonGroup>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default withRouter(EditInvestment)
