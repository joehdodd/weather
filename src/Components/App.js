import React from 'react';
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
      place: {
        city: null,
        state: null
      }
    }
  }

  newPlace = (addMoreData) => {
    let newCity = addMoreData;
    this.setState({
      place: { city: newCity, state: null }
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
                <AddMore addPlace={this.newPlace}/>
                <ConditionsList newPlace={this.state.place} {...props}/>
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
