import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import IconSunnyDay from '../images/components/IconSunnyDay';
import IconPartlyCloudy from '../images/components/IconPartlyCloudy';
import IconLightning from '../images/components/IconLightning';
import IconBlizzard from '../images/components/IconBlizzard';
import IconDrizzle from '../images/components/IconDrizzle';
import IconCloudy from '../images/components/IconCloudy';
import IconRain from '../images/components/IconRain';
import IconMostlyCloudy from '../images/components/IconMostlyCloudy';

class Conditions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : {}
    }
  }

  componentDidMount() {
    let { data } = this.props;
    this.setState({ data: data })
  }

  getIcon = (text) => {
    let conditionTypes = {
      "Sunny": <IconSunnyDay />,
      "Clear": <IconSunnyDay />,
      "Mostly Sunny": <IconSunnyDay />,
      "Partly Cloudy": <IconPartlyCloudy />,
      "Mostly Cloudy": <IconMostlyCloudy />,
      "Scattered Thunderstorms": <IconLightning />,
      "Scattered Showers": <IconDrizzle />,
      "Rain": <IconRain />,
      "Showers": <IconRain />,
      "Thunderstorms": <IconLightning />,
      "Drizzle": <IconDrizzle />,
      "Blizzard": <IconBlizzard />,
      "Cloudy": <IconCloudy />,
    }
    return conditionTypes[text];
  }

  sendRemoveId = (id) => {
    this.props.removeItem(id);
    console.log('%cYou just removed an item, ya dengus! 😆 💯', 'font-size: 24px;');
  }

  render() {
    let { id } = this.props;
    return (
      <div className="weather-item">
        { !!this.state.data.item
          ?
          <div className="conditions">
            <div className="remove" onClick={ () => { this.sendRemoveId(id) } }>Remove</div>
            <Link to={`/forecast/${this.props.city}`}>
              <h3>{this.state.data.location.city}</h3>
              <p><span className="hi-temp">{this.state.data.item.forecast[0].high}&deg;</span> <span className="lo-temp">{this.state.data.item.forecast[0].low}&deg;</span></p>
              <p className="current-temp">{this.state.data.item.condition.temp}&deg;</p>
              <div className="weather-icon">
                {this.getIcon(this.state.data.item.condition.text)}
              </div>
            </Link>
          </div>
          :
          <div className="conditions">
            <p>Loading data...</p>
          </div>
        }
      </div>
    )
  }
}

export default Conditions
