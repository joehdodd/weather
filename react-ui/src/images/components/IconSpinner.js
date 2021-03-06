import React from 'react';

export default (props) => {
  const iconColor = props.iconColor || '#3c3c3c';
  return (
    <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66">
       <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  )
}
