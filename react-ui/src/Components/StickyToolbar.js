import React from 'react';
import SearchAutoComplete from './SearchAutoComplete';
import WeatherIcon from './WeatherIcon';
import Search from '../images/components/Search';

const StickyToolbar = (props) => {
  return (
    <div className="sticky-toolbar-container">
      <div style={{maxHeight: '100%', maxWidth: '30%'}}>
        <WeatherIcon text="Breezy" color="#5f2f83"/>
      </div>
      <div style={{justifySelf: 'end', width: '50px'}} onClick={() => { props.showPortal() }}>
        <Search width={{maxWidth: '24px'}} iconColor="#73c8a9" />
      </div>
    </div>
  )
}

export default StickyToolbar;
