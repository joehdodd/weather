import React, { Component } from 'react';
import Forecast from './Forecast';
import CurrentConditions from './CurrentConditions';
import axios from 'axios';

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : {}
    }
  }

  componentWillMount() {
    let { city, state } = this.props;
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%2C%2$${state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
      .then(res => {
        let data = res.data.query.results.channel;
        this.setState({ data : data });
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  render () {
    let { item } = this.state.data;
    return (
      <div>
        { !!item
          ? <div>
              <CurrentConditions current={item.condition}/>
              <Forecast forecast={item.forecast} current={item.condition}/>
            </div>
          : <p>Loading weather for {this.props.city}, {this.props.state}.</p>
        }
      </div>
    )
  }
}

export default Weather;
