import React from 'react';
import DailyBreakdown from './DailyBreakdown';

const SummaryBreakDown = (props) => {
  console.log(props);
  return (
    <div className="summary-container">
      <span>Currently: {props.data.currently.summary}</span>
      <span>Temperature: {props.data.currently.temperature}&deg;</span>
      <DailyBreakdown {...props} />
    </div>
  )
}

export default SummaryBreakDown;
