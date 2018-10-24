import React, { Component } from 'react'
import { Row, Col, Table, Pagination, PaginationItem, PaginationLink, Alert } from 'reactstrap'
import ClientService from '../../services/client-service'
import Receipt from './Item'
import Loading from '../Loader/Loader'

class PaymentsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receipts: [],
      client: [],
      pageSize: 10,
      currentPage: 1,
      receiptItem: [],
      paginationItems: []
    }
    this.clientService = new ClientService()
  }
  handlePageChange(i) {
    this.setState({
      currentPage: i
    })
  }
  componentDidMount() {
    if (this.props.clientId) {
      const clientId = this.props.clientId
      this.clientService.getPaymentsToClient(clientId)
        .then(response => {
          if (response.success) {
            this.setState({
              receipts: response.data,
              totalPages: Math.ceil(response.data.length / this.state.pageSize)
            }, () => {
              this.loadPaginationItems()
            })
          }
        })
    } else {
      this.clientService.getPayments()
        .then(response => {
          if (response.success) {
            this.setState({
              receipts: response.data,
              totalPages: Math.ceil(response.data.length / this.state.pageSize)
            }, () => {
              this.loadPaginationItems()
            })
          }
        })
    }
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
  loadClient = (client_id) => {
    this.clientService.getClientById(client_id)
      .then(response => {
        if (response.success) {
          this.setState({
            client: response.data
          })
        }
      })
  }
  loadPage(currentPage) {
    return this.state.receipts.slice((currentPage - 1) * this.state.pageSize, currentPage * this.state.pageSize)
  }
  render() {
    const receiptsPage = this.loadPage(this.state.currentPage)
    const receiptItem = receiptsPage.map(receipt => {
      return <Receipt key={receipt._id} clientId={receipt.clientId} name={receipt.name} lastName={receipt.lastName} loadClient={this.loadClient} id={receipt._id} amount={receipt.amount} description={receipt.description} methodOfPayment={receipt.methodOfPayment} date={receipt.date.substring(0, 10)} investments={receipt.investments} />
    })
    if (!this.state.receipts) {
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
        <Col lg={12} className="mx-auto client">
          {receiptItem.length > 0 ?
            <div>
              <h1>Recibos</h1>
              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Apellido</th>
                    <th>Nombre</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                    <th>Método de Pago</th>
                    <th>Concepto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptItem}
                </tbody>
              </Table>
              <Pagination>
                {this.state.paginationItems}
              </Pagination>
            </div> : <Alert color="danger">No se han encontrado pagos</Alert>}
        </Col>
      </Row>
    )
  }
}

export default PaymentsList
