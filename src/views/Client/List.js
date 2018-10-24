import React, { Component } from 'react'
import ClientItem from '../../components/Client/Item'
import Loading from '../../components/Loader/Loader'
import { Table, Row, Col, Badge, Alert, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import ClientService from '../../services/client-service'

class ClientList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      pageSize: 10,
      currentPage: 1,
      paginationItems: []
    }
    this.clientService = new ClientService()
  }
  componentDidMount() {
    this.clientService.getClients()
      .then(response => {
        if (response.success) {
          this.setState({
            clients: response.data,
            totalPages: Math.ceil(response.data.length / this.state.pageSize)
          }, () => {
            this.loadPaginationItems()
          })
        }
      })
  }
  handlePageChange(i) {
    this.setState({
      currentPage: i
    })
  }
  loadPaginationItems = () => {
    let paginationItems = []
    for (let i = 0; i < this.state.totalPages; i++) {
      paginationItems.push(
        <PaginationItem
          key={i}
          active={this.state.currentPage === { i } ? true : false}>
          <PaginationLink onClick={this.handlePageChange.bind(this, i + 1)} className="pagination-link">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      )
    }
    this.setState({
      paginationItems
    })
  }
  loadPage(currentPage) {
    return this.state.clients.slice((currentPage - 1) * this.state.pageSize, currentPage * this.state.pageSize)
  }
  render() {
    const { clients } = this.state
    const clientsPage = this.loadPage(this.state.currentPage)
    const clientItem = clientsPage.map(client => {
      return <ClientItem key={client._id} id={client._id} name={client.name} lastName={client.lastName} email={client.email} date={client.since.substring(0, 10)} />
    })
    if (!this.state.clients) {
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
        <Col lg={8} className="mx-auto client-list-container">
          <div className="client-list-title">
            <h1>Clientes</h1>
            {clients.length > 0 && <h2 className="secondary client-count-text">Nº clientes: <Badge color="danger" className="client-count">{clients.length}</Badge></h2>}
          </div>
          {clients.length > 0 ?
            <div>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Desde</th>
                  </tr>
                </thead>
                <tbody>
                  {clientItem}
                </tbody>
              </Table>
              <Pagination>
                {this.state.paginationItems}
              </Pagination>
            </div>
            : <Alert color="danger">No se han encontrado clientes</Alert>}
        </Col>
      </Row>
    )
  }
}

export default ClientList
