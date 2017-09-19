import React, { Component } from 'react';
import '../App.css';
import Weather from './Weather';

class App extends Component {

  // addCity()  {
  //   return console.log("submit")
  //   // return (
  //   //   <Weather city={city} state={state}/>
  //   // )
  // }

  render() {
    return (
      <div className="weather-container">
        {/* <form>
          <input onSubmit={this.addCity()}></input>
        </form>
        {this.addCity()} */}
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
