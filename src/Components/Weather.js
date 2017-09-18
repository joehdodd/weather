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
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%2C%2${state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
      .then(res => {
        let data = res.data.query.results.channel.item;
        this.setState({ data : data });
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  render () {
    let { data } = this.state;
    let { forecast, condition} = data;
    return (
      <div>
        { data === undefined
          ? <p>Loading...</p>
          : <p>{data.title}</p>
        }
        { forecast === undefined
          ? <p>Waiting on forecast...</p>
          : <div>
              <CurrentConditions current={condition}/>
              <Forecast forecast={forecast}/>
            </div>
        }
      </div>
    )
  }
}

export default Weather;
