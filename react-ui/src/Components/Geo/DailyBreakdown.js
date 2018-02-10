import React from 'react';
import moment from 'moment';
import Slider from 'react-slick';

const DailyBreakdown = (props) => {
  const dailyArray = (props) => {
    return props.data.daily.data.map(day => {
      return (
        <div>
          <p>{moment.unix(day.time).format('MMMM Do YYYY')}</p>
          <span>{day.summary}</span>
        </div>
      )
    })
  }

  return (
    <div className="day-data-container">
      {dailyArray(props)}
    </div>
  )
}

export default DailyBreakdown;
