import React from 'react';
import SearchAutoComplete from './SearchAutoComplete';
import WeatherIcon from './WeatherIcon';

const StickyToolbar = (props) => {
  return (
    <div className="sticky-toolbar-container">
      <div style={{maxHeight: '100%', maxWidth: '30%'}}>
        <WeatherIcon text="Breezy" color="#5f2f83"/>
      </div>
      <SearchAutoComplete
        sendRequest={props.sendRequest}
      />
    </div>
  )
}

export default StickyToolbar;
