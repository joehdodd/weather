import React, { Component } from 'react';

class Forecast extends Component {
  render() {
    console.log(this.props.forecast[0].date)
    let { forecast } = this.props;
    console.log(forecast[0].date)
    return (
      <ul>
        {
          forecast === undefined
            ?
            <li>
              <span>Loading Forecast!</span>
            </li>
            :
            forecast.map(data => {
              return (
                <li key={data.date}>
                  <h4>
                    {data.date}
                  </h4>
                  <p>High: {data.high}</p>
                  <p>Low: {data.low}</p>
                </li>
              )
            })
        }
      </ul>
    )
  }
}

export default Forecast;
