import React from 'react';

const SummaryBreakDown = (props) => {
  console.log(props);
  return (
    <div>
      <span>{props.data.daily.summary}</span>
    </div>
  )
}

export default SummaryBreakDown;
