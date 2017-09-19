import React, { Component } from 'react';

class CurrentConditions extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.current.title}</h3>
        <p>Currently, it is {this.props.current.condition.temp} and conditions are {this.props.current.condition.text.toLocaleLowerCase()}.</p>
      </div>
    )
  }
}

export default CurrentConditions;
