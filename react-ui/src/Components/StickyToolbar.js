import React from 'react';
import AddMore from './AddMore';

const StickyToolbar = (props) => {
  return (
    <div className="sticky-toolbar-container">
      <div>
        <h1>Dark Sky Weather</h1>
      </div>
      <AddMore
        geoLocateSearch={props.geoLocateSearch}
        newPlace={props.newPlace}
        placeHolder="Get Weather..."
      />
    </div>
  )
}

export default StickyToolbar;
