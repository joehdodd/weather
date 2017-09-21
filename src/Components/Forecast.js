import React, { Component } from 'react';
import Slider from 'react-slick';

class Forecast extends Component {

  // getForecast(id) {
  //   let { forecast } = this.props;
  //   return forecast.map(data => {
  //       return (
  //         <div key={data.date} className="forecast-item">
  //           <h4>
  //             {data.date}
  //           </h4>
  //           <p>High: {data.high}</p>
  //           <p>Low: {data.low}</p>
  //         </div>
  //       )
  //     })
  // }

  SETTINGS = {
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
  }

  render() {
    let data = this.props.data;
    let id = this.props.match.params.forecastId;
    console.log(id)
    return (
      <div className="slide-container">
        { data.item === undefined
            ? <div>
                <span>Loading Forecast!</span>
              </div>
            : <Slider {...this.SETTINGS}>
                {this.getForecast(id)}
              </Slider>
        }
      </div>
    )
  }
}

export default Forecast;
