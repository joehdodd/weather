import React from 'react';

const SummaryBreakDown = (props) => {
  console.log(props);
  return (
    <div className="summary-container">
      <span>Currently: {props.data.currently.summary}</span>
      <span>Temperature: {props.data.currently.temperature}&deg;</span>
    </div>
  )
}

export default SummaryBreakDown;
