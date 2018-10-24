import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, Button, ButtonGroup } from 'reactstrap'
import ClientService from '../../services/client-service'

class EditClient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      lastName: this.props.lastName,
      email: this.props.email
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
    const id = this.props.id
    const { name, lastName, email } = this.state
    const data = { name, lastName, email }
    this.clientService.editClient(id, data)
      .then(response => {
        if (response.success) {
          this.props.loadData()
          this.props.showEditForm()
        }
      })
  }
  cancel = () => {
    this.props.showEditForm()
  }
  render() {
    const { name, lastName, email } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="first-name">Nombre</Label>
          <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="text" id="first-name" name="name" placeholder="Nombre" value={name} />
        </FormGroup>
        <FormGroup>
          <Label for="last-name">Apellido</Label>
          <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="text" id="last-name" name="lastName" placeholder="Apellido" value={lastName} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input onChange={(e) => this.handleChange(e.target.name, e.target.value)} type="email" id="email" name="email" placeholder="Email" value={email} />
        </FormGroup>
        <ButtonGroup>
          <Button outline color="secondary">Guardar</Button>
          <Button outline onClick={this.cancel} color="danger">Cancelar</Button>
        </ButtonGroup>
      </Form>
    )
  }
}

export default EditClient
