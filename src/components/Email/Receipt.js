import React, { Component } from 'react'
import EmailItem from './Item'

class EmailTemplate extends Component {
  render() {
    let emailItem = []
    this.props.investments.forEach(investment => {
      emailItem.push(<EmailItem key={investment._id} _id={investment._id} amount={investment.amount} interest={investment.interest} startDate={investment.startDate} endDate={investment.endDate} duration={investment.duration} paymentFrequency={investment.paymentFrequency} />)
    })
    return (
      <div style={{ width: 100 + '%; font-family: Verdana, Trebuchet, sans-serif; font-size: 14px' }}>
        <div style={{ fontSsize: 14 + 'px; width: 100%' }}>
          <div style={{ padding: 30 + 'px 0' }}>
            <img src="cid:logo@thriven.com" width="200px" alt="Thriven Logo" />
          </div>
          <div style={{ marginTop: '0' }}>
            <p style={{ fontWeight: 'bold' }}>Recibo No. {this.props.paymentNumber}</p>
            <p>Fecha: {this.props.date.substring(0, 10)}</p>
            <p>Cliente: {this.props.name.charAt(0).toUpperCase() + this.props.name.substr(1).toLowerCase()} {this.props.lastName.charAt(0).toUpperCase() + this.props.lastName.substr(1).toLowerCase()}</p>
            <p>Email: {this.props.email}</p>
          </div>
        </div>
        <h4 style={{ fontSize: 14 + 'px' }}>Inversiones</h4>
        <table style={{ borderSpacing: '0; border-top: 1px solid' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>Monto</th>
              <th style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>Tasa</th>
              <th style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>Freq pago</th>
              <th style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>Fecha Inicio</th>
              <th style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>Fecha Fin</th>
              <th style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>Duracion</th>
              <th style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>Pago</th>
            </tr>
          </thead>
          {emailItem}
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ fontWeight: 'bold; text-align: center; margin: 0; padding: 5px 10px; font-family: Verdana, Trebuchet, sans-serif; font-size: 14px' }}>Total</td>
              <td style={{ fontWeight: 'bold; text-align: center; margin: 0; padding: 5px 10px; font-family: Verdana, Trebuchet, sans-serif; font-size: 14px' }}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2
                }).format(this.props.totalAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default EmailTemplate
