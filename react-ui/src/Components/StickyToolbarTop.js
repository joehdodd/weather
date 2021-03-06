import React from 'react';
import SearchBox from './SearchBox';
import { NavLink } from 'react-router-dom';

const StickyToolbarTop = (props) => {
  return (
    <div className="sticky-toolbar-container">
      <SearchBox fetchWeather={props.fetchWeather} />
      <div className="sticky-toolbar-nav">
        <NavLink exact to={{ pathname: '/'}}>
          Home
        </NavLink>
        <NavLink exact to={{ pathname: '/forecast'}}>
          Forecast
        </NavLink>
        <NavLink exact to={{ pathname: '/favorites'}}>
          Favorites
        </NavLink>
      </div>
    </div>
  )
}

export default StickyToolbarTop;
