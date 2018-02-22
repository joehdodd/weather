import React from 'react';
import IconStar from '../images/components/IconStar';

const FavoritesList = props => {
  const fetchFavWeather = async fav => {
    const params = {
      lat: fav.lat,
      lng: fav.lng
    };
    await props.fetchWeather(params);
    props.history.push('/');
  };
  const favoritesArray = props => {
    return props.favorites.map(fav => {
      return (
        <div className="favorites-list-item" key={fav.lng}>
          <span className="clickable" onClick={() => fetchFavWeather(fav)}>
            {fav.address}
          </span>
          <div
            className="favorite-icon"
            style={{ justifySelf: 'end' }}
            onClick={() => props.toggleFavorites()}
          >
            <IconStar iconColor="orange" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="favorites-list">
      {props.favorites.length > 0 ? (
        favoritesArray(props)
      ) : (
        <h3 style={{justifySelf: 'center', alginSelf: 'center'}}>You have no favorites! Use the star icon to favorite</h3>
      )}
    </div>
  );
};

export default FavoritesList;