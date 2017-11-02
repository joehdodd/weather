import React from 'react';
import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route } from 'react-router-dom';
import AddMore from './AddMore';
import ConditionsList from './ConditionsList';
import Forecast from './Forecast';
import '../App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      places: []
    }
  }

  newPlace = (newPlace) => {
    let uri = `https://query.yahooapis.com/v1/public/yql?q=`;
    let queryText = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${newPlace}")&format=json`;
    let restQuery = uri += queryText;
    axios.get(restQuery)
    .then(res => {
      let data = res.data.query.results.channel;
      this.setState({
        places: [
          { id: newPlace, data: data }
        ]
      })
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <Route render={({ location }) => (
        <div>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={100}
            transitionAppear={true}
            transitionLeave={true}
            transitionAppearTimeout={600}
          >
          <Route
            location={location}
            key={location.pathname}
            exact
            path="/"
            render={({...props}) => (
              <div>
                <AddMore newPlace={this.newPlace}/>
                <ConditionsList places={this.state.places} {...props}/>
              </div>
            )}
          />
          </CSSTransitionGroup>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={500}
          >
            <Route
              location={location}
              key={location.pathname}
              path={`/forecast/:forecastId`}
              render={({...props}) => (
                <Forecast {...props}/>
              )}
            />
          </CSSTransitionGroup>
        </div>
      )}/>
    )
  }
}

export default App
