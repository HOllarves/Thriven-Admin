import React, { Component } from 'react'

class EmailItem extends Component {
    render() {
        const { _id, amount, interest, startDate, endDate, duration, paymentFrequency } = this.props
        return (
            <tbody>
                <tr key={_id}>
                    <td style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 2
                        }).format(amount)}</td>
                    <td style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>
                        {new Intl.NumberFormat('en-US', {
                            style: 'percent',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(interest / 100)}</td>
                    <td style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>{paymentFrequency}</td>
                    <td style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>{startDate.substring(0, 10)}</td>
                    <td style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>{endDate.substring(0, 10)}</td>
                    <td style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>{duration}</td>
                    <td style={{ borderBottom: 1 + 'px solid silver; text-align: center; margin: 0; padding: 5px 10px' }}>
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 2
                        }).format(amount * (interest / 100))}</td>
                </tr>
            </tbody>
        )
    }
}

export default EmailItem
