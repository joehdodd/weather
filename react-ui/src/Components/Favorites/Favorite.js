import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import IconStar from '../../images/components/IconStar';

const Favorite = props => {
  const fetchFavWeather = async fav => {
    const params = {
      lat: fav.lat,
      lng: fav.lng
    };
    await props.fetchWeather(params);
    props.history.push('/');
  };
  return (
    <Draggable
      draggableId={props.id}
      index={props.index}
      key={props.id}
    >
      {(provided, snapshot) => {
        const style = {
          backgroundColor: snapshot.isDragging ? '#f5f5f5' : '#ebebeb',
          ...provided.draggableProps.style,
          transition: snapshot.isDragging
            ? 'background-color 500ms cubic-bezier(0.4, 0.0, 0.2, 1)'
            : ''
        };
        return (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
            >
              <div className="favorites-list-item">
                <span
                  className="clickable"
                  onClick={() => fetchFavWeather(props.fav)}
                >
                  {props.address}
                </span>
                <div
                  className="favorite-icon"
                  style={{ justifySelf: 'end' }}
                  onClick={() => props.removeFavorite(props.address)}
                >
                  <IconStar iconColor="orange" />
                </div>
              </div>
            </div>
            {provided.placeholder}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Favorite;
