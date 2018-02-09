import React from 'react';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Conditions from './Conditions';

const ConditionsList = (props) => {
    const { places } = props;
    let conditionItems = places.map( (place, index) => {
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
        <div className="component-container" style={{borderRadius: 4, padding: 10}}>
          <div className="conditions-heading">
            <h1>Your Favorites</h1>
            <p>
              For details and a 10-day forecast, tap or click a card.
              Drag and drop to reorder.
            </p>
          </div>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div ref={provided.innerRef} className="weather-container">
              {conditionItems}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
}
export default ConditionsList
