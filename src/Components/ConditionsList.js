import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Conditions from './Conditions';
import { Draggable } from 'react-beautiful-dnd';

const ConditionsList = (props) => {
    const { places } = props;
    let conditionItems = places.map( (place, index) => {
    let uniqueKey = (Math.floor((1 + Math.random()) * 0x10000));
      return (
        // <Draggable draggableId={`${props.id}_${index}`} key={uniqueKey} index={index}>
        //   {(provided, snapshot) => (
            <Conditions
              // ref={provided.innerRef}
              // {...provided.draggableProps}
              // {...provided.dragHandleProps}
              index={index}
              key={uniqueKey}
              id={place.id}
              updatedAt={place.updatedAt}
              data={place.data.data}
              removeItem={props.removeItem}
              updateItem={props.updateItem}
            />
        //   )}
        // </Draggable>
      )
    })
    return (
      <div>
        <div className="conditions-heading">
          <h1>Current Conditions</h1>
          <p>To see details and a 10-day forecast, tap or click a card.</p>
        </div>
        <div className="weather-container">

        </div>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              className="weather-container"
              ref={provided.innerRef}
              // style={{ backgroundColor: provided.isDragging ? 'green' : 'lightblue' }}
              >
                {conditionItems}
              </div>
            )}
        </Droppable>
      </div>
    )
}
export default ConditionsList
