import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Favorite from './Favorite';

const FavoritesList = props => {
  const favoritesArray = props.favorites.map((fav, index) => {
    let uniqueKey = `favorite_${fav.address.split(' ').join('_')}`
    return (
      <Favorite
        key={uniqueKey}
        id={uniqueKey}
        index={index}
        history={props.history}
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
