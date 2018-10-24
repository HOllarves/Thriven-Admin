import React, { Component } from 'react'
import ClientService from '../../services/client-service'
import { Button, ButtonGroup, Form, FormGroup, Label, Input, Row, Col, Alert } from 'reactstrap'
import { withRouter } from 'react-router-dom'

class ClientForm extends Component {
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
    if (!this.state.name || !this.state.lastName || !this.state.email) {
      return this.setState({
        error: true
      })
    }
    const { name, lastName, email } = this.state
    const data = { name, lastName, email }
    this.clientService.addClient(data)
      .then(response => {
        if (response.success) {
          this.props.history.push(`/`)
        }
      })
  }
  cancel = () => {
    this.props.history.push(`/`)
  }
  render() {
    return (
      <Row>
        <Col xs={8} className="mx-auto client-form-container">
          <h1>Nuevo Cliente</h1>
          <Form onSubmit={this.handleSubmit} className="client-form">
            <FormGroup>
              <Label for="first-name">Nombre</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="text" id="first-name" name="name" placeholder="Nombre" />
            </FormGroup>
            <FormGroup>
              <Label for="last-name">Apellido</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="text" id="last-name" name="lastName" placeholder="Apellido" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="email" id="email" name="email" placeholder="Email" />
            </FormGroup>
            {this.state.error && <Alert color="danger">Debe rellenar todos los campos</Alert>}
            <ButtonGroup>
              <Button outline color="secondary">Crear</Button>
              <Button outline onClick={this.cancel} color="danger">Cancelar</Button>
            </ButtonGroup>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default withRouter(ClientForm)
