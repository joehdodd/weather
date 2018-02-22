import React from 'react';
import IconStar from '../images/components/IconStar';
import IconRefresh from '../images/components/IconRefresh';

const StickyToolbarBottom = props => {
  return (
    <div className="bottom-toolbar-container">
      <div className="favorite-icon" style={{justifySelf: 'start'}} onClick={() => props.toggleFavorites()}>
        <IconStar iconColor={`${props.isFavorite ? 'orange' : '#3c3c3c'}`} />
      </div>
      <div className="refresh-icon" onClick={() => props.refreshWeather()}>
        <IconRefresh />
      </div>
    </div>
  );
};

export default StickyToolbarBottom;
