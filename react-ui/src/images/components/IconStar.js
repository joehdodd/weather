import React from 'react';

export default (props) => {
  const iconColor = props.iconColor || '#3c3c3c';
  return (
    <svg viewBox="0 0 24 24" height="48" width="48" >
      <path fill={iconColor} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  )
}