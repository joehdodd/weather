import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Favorite from './Favorite';

const FavoritesList = props => {
  const favoritesArray = props.favorites.map((fav, index) => {
    let uniqueKey = Math.floor((1 + Math.random()) * 0x10000).toString();
    return (
      <Favorite
        key={uniqueKey}
        index={index}
        history={props.history}
        uniqueKey={uniqueKey}
        address={fav.address}
        removeFavorite={props.removeFavorite}
        fetchWeather={props.fetchWeather}
        fav={fav}
      />
    );
  });
  return (
    <Droppable droppableId="favorites">
      {(provided, snapshot) => (
        <div className="favorites-list" ref={provided.innerRef}>
          {props.favorites.length > 0 ? (
            favoritesArray
          ) : (
            <h3 style={{ justifySelf: 'center', alginSelf: 'center' }}>
              You have no favorites! Use the star icon to favorite
            </h3>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FavoritesList;
