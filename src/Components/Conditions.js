import React from 'react';
import { Link } from 'react-router-dom';
import WeatherIcon from './WeatherIcon';
import moment from 'moment';
import { Draggable } from 'react-beautiful-dnd';


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
  const lastUpdate = moment(props.updatedAt).format('MMM Do YYYY, h:mm a');
  const linkId = id.split(' ').join('_');
  return (
    <Draggable draggableId={linkId} index={props.index}>
      {(provided, snapshot) => (
    <div
      className="weather-item"
      key={linkId}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      >
        { !!channel &&
          <div
            className="conditions"
            >
            <Link to={{ pathname: `/forecast/${linkId}`, state: channel }}>
              <h3>{channel.location.city}</h3>
              <span>Updated | { lastUpdate }</span>
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
      )}
    </Draggable>
  )
}

export default Conditions
