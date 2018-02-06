import React from 'react';
import { Link } from 'react-router-dom';
import WeatherIcon from './WeatherIcon';

const Conditions = (props) => {

  const sendRemoveId = (id) => {
    props.removeItem(id);
    console.log('%cYou just removed an item, ya dengus! 😆 💯', 'font-size: 24px;');
  }

  const sendUpdate = (id) => {
    props.updateItem(id);
    console.log('%cYou just updated an item, ya dengus! 😆 💯', 'font-size: 24px;');
  }

  const { channel } = props.data.query.results;
  const { id } = props;
  const linkId = id.split(' ').join('_');
  return (
    <div className="weather-item">
        { !!channel &&
          <div className="conditions">
            <Link to={{ pathname: `/forecast/${linkId}`, state: channel }}>
              <h3>{channel.location.city}</h3>
              <p><span className="hi-temp">{channel.item.forecast[0].high}&deg;</span> <span className="lo-temp">{channel.item.forecast[0].low}&deg;</span></p>
              <p className="current-temp">{channel.item.condition.temp}&deg;</p>
              <WeatherIcon text={channel.item.condition.text}/>
            </Link>
            <div className="remove-update-container">
              <div className="update" onClick={ () => { sendUpdate(id) }}>Update</div>
              <div className="remove" onClick={ () => { sendRemoveId(id) } }>Remove</div>
            </div>
          </div>
        }
        { !channel &&
          <div className="conditions">
            <span>Loading...</span>
          </div>
        }
    </div>
  )
}

export default Conditions
