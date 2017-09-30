import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Conditions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : {}
    }
  }

  componentDidMount() {
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${this.props.city}%2C%2$${this.props.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
    .then(res => {
      let data = res.data.query.results.channel;
      this.setState({ data : data });
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="weather-item">
        { !!this.state.data.item
          ?
          <div className="conditions">
            <Link to={`/forecast/${this.props.city}`}>
              <h3>{this.props.city}</h3>
              <p><span className="hi-temp">{this.state.data.item.forecast[0].high}&deg;</span><span className="lo-temp">{this.state.data.item.forecast[0].low}&deg;</span></p>
              <p className="current-conditions">{this.state.data.item.condition.text}</p>
              <p className="current-temp">{this.state.data.item.condition.temp}&deg;</p>
            </Link>
          </div>
          : <p>oops</p>
        }
      </div>
    )
  }
}

export default Conditions
