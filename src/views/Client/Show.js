import React, { Component } from 'react'
import { Row, Col, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import ClientService from '../../services/client-service'
import Investments from '../../components/Investment/List'
import EditClient from '../../components/Client/Edit'
import Loading from '../../components/Loader/Loader'

class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      showEditForm: false,
      modal: false
    }
    this.clientService = new ClientService()
  }
  componentDidMount() {
    this.loadData()
  }
  delete = () => {
    const id = this.props.match.params.id
    this.clientService.deleteClient(id)
      .then(response => {
        this.props.history.push("/")
      })
  }
  showEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
  }
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  loadData() {
    this.clientService.getClientById(this.props.match.params.id)
      .then(response => {
        if (response.success) {
          const client = response.data
          this.setState({
            client,
            investments: client.investments
          })
        }
      })
  }
  render() {
    if (!this.state.investments || !this.state.client) {
      return (
        <Row className="loader">
          <Col lg={1} className="mx-auto">
            <Loading type="Bars" color="#858E97" />
          </Col>
        </Row>
      )
    }
    const { client, investments } = this.state
    return (
      <Row>
        <Col lg={8} className="mx-auto client">
          <h1>{client.name.charAt(0).toUpperCase() + client.name.substr(1).toLowerCase()} {client.lastName.charAt(0).toUpperCase() + client.lastName.substr(1).toLowerCase()}</h1>
          <h2 className="secondary">{client.email}</h2>
          <Modal isOpen={this.state.modal}>
            <ModalHeader>Eliminar Cliente</ModalHeader>
            <ModalBody>¿Quiere eliminar a <span className="modal-client-name">{client.name} {client.lastName}</span> de la base de datos?</ModalBody>
            <ModalFooter>
              <Button outline onClick={this.toggleModal} color="secondary">Cancelar</Button>
              <Button outline onClick={this.delete} color="danger">Eliminar</Button>
            </ModalFooter>
          </Modal>
          <ButtonGroup>
            <Button outline onClick={this.showEditForm} color="secondary">Editar</Button>
            <Button outline onClick={this.toggleModal} color="danger">Eliminar</Button>
          </ButtonGroup>
          {this.state.showEditForm && <EditClient name={client.name} lastName={client.lastName} email={client.email} showEditForm={this.showEditForm} loadData={this.loadData.bind(this)} id={client._id} />}
        </Col>
        <Investments loadData={this.loadData.bind(this)} investments={investments} clientId={client._id} name={client.name} lastName={client.lastName} />
      </Row>
    )
  }
}

export default withRouter(Client)
