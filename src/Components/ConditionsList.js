import React from 'react';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Conditions from './Conditions';
// import { Draggable } from 'react-beautiful-dnd';

const ConditionsList = (props) => {
    const { places } = props;
    let conditionItems = places.map( (place, index) => {
    console.log(place);
    let uniqueKey = (Math.floor((1 + Math.random()) * 0x10000)).toString()
      return (
        <Conditions
          index={index}
          dragKey={uniqueKey}
          key={uniqueKey}
          id={place.id}
          updatedAt={place.updatedAt}
          data={place.data.data}
          removeItem={props.removeItem}
          updateItem={props.updateItem}
        />
      )
    })

    return (
      <div>
        <div className="conditions-heading">
          <h1>Current Conditions</h1>
          <p>
            To see details and a 10-day forecast, tap or click a card.
            Or, drag and drop to reorder your favorite places.
          </p>
        </div>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div className="weather-container" ref={provided.innerRef}>
              {conditionItems}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
}
export default ConditionsList
