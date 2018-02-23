import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import FavoritesList from './FavoritesList';

const FavoritesContainer = props => {
  const { fetching, favorites, fetchWeather, history, removeFavorite } = props;
  return (
    <Route
      location={props.location}
      key={props.location.pathname}
      exact
      path="/favorites"
      render={({ ...props }) => (
        <div className="favorites-route">
          <CSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionLeave={true}
            transitionEnterTimeout={1000}
            transitionAppearTimeout={750}
            transitionLeaveTimeout={750}
          >
            {fetching ? (
              <div className="loading-container pulsate">
                <h1>Loading your weather...</h1>
              </div>
            ) : (
              <FavoritesList history={history} favorites={favorites} fetchWeather={fetchWeather} removeFavorite={removeFavorite}/>
            )}
          </CSSTransitionGroup>
        </div>
      )}
    />
  );
};

export default withRouter(FavoritesContainer);
