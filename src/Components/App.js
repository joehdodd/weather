import React from 'react';
import { connect } from 'react-redux';
import { getWeather } from '../actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { HashRouter as Router } from 'react-router-dom';
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
    const { dispatch } = this.props;
    dispatch(getWeather('new york'));
    // let localStorageRef = localStorage.getItem(`places`);
    // places: JSON.parse(localStorageRef)
  }

  // componentDidUpdate() {
  //   const { places } = this.props;
  //   localStorage.setItem(`places`, JSON.stringify(places));
  // }

  newPlace = (newPlace) => {
    const { dispatch } = this.props;
    dispatch(getWeather(newPlace));
    // let uri = `https://query.yahooapis.com/v1/public/yql?q=`;
    // let queryText = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${newPlace}")&format=json`;
    // let restQuery = uri += queryText;
    // axios.get(restQuery)
    // .then(response => {
    //   let results = response.data.query.results;
    //   let data = response.data.query.results.channel;
    //   if (!results || !data ) {
    //     this.setState({ notFound: true });
    //   }
    //   if (!!results || !!data) {
    //     this.setState( prevState => ({
    //       places: [...prevState.places, { id: newPlace, data: data}],
    //       notFound: false
    //     }));
    //   }
    // })
    // .catch( (error) => {
    //   this.setState({ notFound: true });
    //   console.log(error);
    // })
  }

  removeItem = (id) => {
    let { places } = this.state;
    places.splice(id, 1);
    this.setState({ places });
  }

  render() {
    const { places } = this.props;
    return (
      <Router>
        <Route render={({ location }) => (
          <div>
            <CSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={100}
              transitionAppear={true}
              // transitionLeave={true}
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
                      { !!places &&
                        <ConditionsList places={this.props.places} removeItem={this.removeItem} {...props}/>
                      }
                      { this.state.notFound &&
                        <CSSTransitionGroup
                          transitionName="fade"
                          transitionAppear={true}
                          transitionLeave={true}
                          transitionEnterTimeout={1000}
                          transitionAppearTimeout={750}
                          transitionLeaveTimeout={750}
                          >
                            <h2>Oops! Your search returned no results. Check your spelling and try again! <span style={{fontSize: 48}}>🤔</span></h2>
                          </CSSTransitionGroup>
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
      </Router>
    )
  }
}


function mapStateToProps(state) {
  const { getWeather } = state;
  const { places, notFound } = getWeather
  return {
    getWeather,
    places,
    notFound
  }
}

export default connect(mapStateToProps)(App)
