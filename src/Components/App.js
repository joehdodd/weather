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
      notFound: false,
      places: []
    }
  }

  componentWillMount() {
    let localStorageRef = localStorage.getItem(`places`);
    if (!!localStorageRef) {
      this.setState({
        places: JSON.parse(localStorageRef)
      })
    }
  }

  componentDidUpdate() {
    let { places } = this.state;
    localStorage.setItem(`places`, JSON.stringify(places));
  }

  newPlace = (newPlace) => {
    let uri = `https://query.yahooapis.com/v1/public/yql?q=`;
    let queryText = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${newPlace}")&format=json`;
    let restQuery = uri += queryText;
    axios.get(restQuery)
    .then(response => {
      let results = response.data.query.results;
      let data = response.data.query.results.channel;
      if (!results) {
        this.setState({ notFound: true });
      }
      this.setState( prevState => ({
        places: [...prevState.places, { id: newPlace, data: data}],
        notfound: false
      }));
    })
    .catch( (error) => {
      this.setState({ notFound: true });
      console.log(error);
    })
  }

  removeItem = (id) => {
    let { places } = this.state;
    places.splice(id, 1);
    this.setState({ places });
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
                <ConditionsList places={this.state.places} removeItem={this.removeItem} {...props}/>
                { this.state.notFound &&
                  <h2>Oops! Your search returned no results. Check your spelling and try again! <span style={{fontSize: 48}}>🤔</span></h2>
                }
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
