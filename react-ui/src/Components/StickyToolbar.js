import React from 'react';
import SearchAutoComplete from './SearchAutoComplete';

const StickyToolbar = (props) => {
  return (
    <div className="sticky-toolbar-container">
      <SearchAutoComplete sendRequest={props.sendRequest}/>
    </div>
  )
}

export default StickyToolbar;
