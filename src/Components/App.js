import React, { Component } from 'react';
import '../App.css';
import Weather from './Weather';
// import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component {
  render() {
    return (
      <div className="weather-container">
        <Weather city="Chattanooga" state="TN" />
        <Weather city="Easton" state="MD" />
        <Weather city="New York" state="NY" />
        <Weather city="Norfolk" state="VA" />
        <Weather city="Milford" state="DE" />
        <Weather city="Bangkok" state={null} />
      </div>
    );
  }
}

export default App;
