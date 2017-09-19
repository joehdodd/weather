import React, { Component } from 'react';

class Conditions extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.city}</h3>
        <p><span className="hi-temp">{this.props.current.forecast[0].high}&deg;</span> <span className="lo-temp">{this.props.current.forecast[0].low}&deg;</span></p>
        <p className="current-conditions">{this.props.current.condition.text}</p>
        <p className="current-temp">{this.props.current.condition.temp}&deg;</p>
      </div>
    )
  }
}

export default Conditions;
