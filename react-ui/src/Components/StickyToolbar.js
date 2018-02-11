import React from 'react';
import SearchAutoComplete from './SearchAutoComplete';

const StickyToolbar = (props) => {
  return (
    <div className="sticky-toolbar-container">
      <div>
        <h1>Dark Sky Weather</h1>
      </div>
      <SearchAutoComplete
        sendRequest={props.sendRequest}
      />
    </div>
  )
}

export default StickyToolbar;
