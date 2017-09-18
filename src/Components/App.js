import React, { Component } from 'react';
import '../App.css';
import Weather from './Weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather city="chattanooga" state="tn"/>
        {/* <Weather city="easton" state="md"/>
        <Weather city="new york" state="ny"/>
        <Weather city="bangkok" state={null}/> */}
      </div>
    );
  }
}

export default App;
