import React from 'react';
import { Link } from 'react-router-dom';
import WeatherIcon from '../WeatherIcon';
import moment from 'moment';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

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
  const { id, index, dragKey } = props;
  const lastUpdate = moment(props.updatedAt).format('MMM Do YYYY, h:mm a');
  const linkId = id.split(' ').join('_');
  return (
    <Draggable draggableId={dragKey} index={index} /*NOTE: do NOT operate on the index prop inside destructuring*/>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        const style = {
          backgroundColor: snapshot.isDragging ? 'rgba(0, 0, 0, 0.5)' : '',
          ...provided.draggableProps.style,
          transition: snapshot.isDragging ? 'background-color 500ms cubic-bezier(0.4, 0.0, 0.2, 1)' : '',
        }
        return (
          <div>
            <div
              className="weather-item conditions"
              key={linkId}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
              >
                <div>
                  <Link to={{ pathname: `/forecast/${linkId}`, state: channel }}>
                    <h3>{channel.location.city}</h3>
                    <span>Updated | {lastUpdate}</span>
                    <p>
                      <span className="hi-temp">
                        {channel.item.forecast[0].high}&deg;
                      </span>{' '}
                      <span className="lo-temp">
                        {channel.item.forecast[0].low}&deg;
                      </span>
                    </p>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      <WeatherIcon text={channel.item.condition.text} />
                      <p className="current-temp">{channel.item.condition.temp}&deg;</p>
                    </div>
                  </Link>
                  <div className="remove-update-container">
                    <div className="update" onClick={() => { sendUpdate(id) }}>
                      Update
                    </div>
                    <div className="remove" onClick={() => { sendRemoveId(id) }}>
                      Remove
                    </div>
                  </div>
                </div>
            </div>
            {provided.placeholder}
          </div>
        )
      }}
    </Draggable>
  )
}

// {!channel && (
//   <div className="conditions">
//     <span>Loading...</span>
//   </div>
// )}

export default Conditions
