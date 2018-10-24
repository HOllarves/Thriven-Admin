import React, {
  Component
} from 'react'
import InvestmentForm from './Form'
import InvestmentItem from './Item'
import PaymentForm from '../Payment/Form'
import PaymentsList from '../Payment/List'
import {
  Table,
  Col,
  Button,
  ButtonGroup,
  Alert
} from 'reactstrap'

class Investments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInvestmentForm: false,
      showPaymentForm: false,
      total: 0,
      investmentsToPay: [],
      investmentIds: []
    }
  }
  showInvestmentForm = () => {
    this.setState({
      showInvestmentForm: !this.state.showInvestmentForm,
      showPaymentForm: false,
      showPaymentsList: false
    })
  }
  showPaymentForm = () => {
    this.setState({
      showPaymentForm: !this.state.showPaymentForm,
      showInvestmentForm: false,
      showPaymentsList: false
    })
  }
  showPaymentsList = () => {
    this.setState({
      showPaymentsList: !this.state.showPaymentsList,
      showInvestmentForm: false,
      showPaymentForm: false
    })
  }
  addInvestmentToTotal = (investment) => {
    const investments = this.state.investmentsToPay
    investments.push(investment)
    this.setState({
      total: this.state.total + (investment.amount * (investment.interest / 100)),
      investmentsToPay: investments
    })
  }
  removeFromTotal = (id) => {
    let removedIndex = this.state.investmentsToPay.findIndex(investment => { return id === investment._id })
    let deletedInvestment = this.state.investmentsToPay[removedIndex]
    let investments = this.state.investmentsToPay.filter(investment => { return id !== investment._id })
    this.setState((prevState) => {
      return {
        total: prevState.total - (deletedInvestment.amount * (deletedInvestment.interest / 100)),
        investmentsToPay: investments
      }
    })
  }
  render() {
    const investments = this.props.investments
    const clientId = this.props.clientId
    const investmentItem = investments.map((investment, index) => {
      return <InvestmentItem
        investmentIds={this.state.investmentIds}
        index={index}
        addInvestmentToTotal={this.addInvestmentToTotal}
        removeFromTotal={this.removeFromTotal}
        investment={investment}
        loadData={this.props.loadData}
        key={investment._id}
        clientId={this.props.client_id}
        _id={investment._id}
        amount={investment.amount}
        interest={investment.interest}
        startDate={investment.startDate.substring(0, 10)}
        endDate={investment.endDate.substring(0, 10)}
        duration={investment.duration}
        paymentFrequency={investment.paymentFrequency}
        showPaymentForm={this.state.showPaymentForm}
      />
    })
    return (
      <Col lg={8}
        className="mx-auto" >
        <h3 className="title" >
          {investments.length === 0 ? <Alert color="danger">El cliente no tiene inversiones</Alert> : "Inversiones"}</h3 >
        {investments.length > 0 &&
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">$ Monto</th>
                <th scope="col">Fecha Inicio</th>
                <th scope="col">Fecha Fin</th>
                <th scope="col">Tasa %</th>
                <th scope="col">Duración</th>
                <th scope="col">Freq Pago</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            {investmentItem}
          </Table>
        }
        <ButtonGroup>
          {
            investments.length > 0 && <Button outline
              onClick={this.showPaymentForm}
              color="secondary">Crear Pago</Button>
          }
          <Button outline onClick={this.showPaymentsList}
            color="secondary"> {this.state.showPaymentsList ? "Esconder" : "Mostrar"} Pagos
          </Button>
          <Button outline onClick={this.showInvestmentForm}
            color="secondary">Crear Inversión</Button>
        </ButtonGroup>
        {this.state.showInvestmentForm && <InvestmentForm loadData={this.props.loadData}
          show={this.showInvestmentForm}
          id={clientId}
        />
        }
        {
          this.state.showPaymentForm && <PaymentForm showPaymentForm={this.showPaymentForm}
            id={
              clientId}
            investments={this.state.investmentsToPay}
            name={this.props.name}
            lastName={this.props.lastName}
            total={this.state.total}
          />
        }
        {this.state.showPaymentsList && < PaymentsList clientId={clientId}
        />
        }
      </Col>
    )
  }
}

export default Investments