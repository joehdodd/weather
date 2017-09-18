import React, { Component } from 'react';
import '../App.css';
import Weather from './Weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather city="Chattanooga" state="TN"/>
        <Weather city="Easton" state="MD"/>
        <Weather city="New York" state="NY"/>
        <Weather city="Bangkok" state={null}/>
      </div>
    );
  }
}

export default App;
