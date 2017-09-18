import React, { Component } from 'react';

class CurrentConditions extends Component {
  render() {
    return (
      <div>
        <p>Currently, it is {this.props.current.temp} and conditions are {this.props.current.text.toLocaleLowerCase()}.</p>
      </div>
    )
  }
}

export default CurrentConditions;
