import React from 'react';

const FavoritesList = props => {
  const fetchFavWeather = async (fav) => {
    const params = {
      lat: fav.lat,
      lng: fav.lng
    };
    await props.fetchWeather(params);
    props.history.push('/');
  }
  const favoritesArray = props => {
    return props.favorites.map(fav => {
      return (
        <div className="favorites-list-item" onClick={() => fetchFavWeather(fav)} key={fav.lng}>
          <span>{fav.address}</span>
        </div>
      );
    });
  };

  return <div className="favorites-list clickable">{favoritesArray(props)}</div>;
};

export default FavoritesList;
