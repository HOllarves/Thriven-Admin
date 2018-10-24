import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

class Loading extends Component {
  render() {
    return (
      <Loader
        type={this.props.type}
        color={this.props.color}
        height="100"
        width="100"
      />
    )
  }
}

export default Loading
