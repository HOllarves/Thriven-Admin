import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import PaymentsList from '../../components/Payment/List'

class ShowReceipts extends Component {
  render() {
    return (
      <Row>
        <Col lg={10} className="mx-auto client">
          <PaymentsList />
        </Col>
      </Row>
    )
  }
}

export default ShowReceipts
