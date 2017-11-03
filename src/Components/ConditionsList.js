import React, { Component } from 'react';
import Conditions from './Conditions';

class ConditionsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places : []
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

  componentWillReceiveProps(nextProps) {
    let newPlace = nextProps.places;
    this.setState( prevState => ({
      places: [...prevState.places, ...newPlace]
    }));
  }

  componentDidUpdate() {
    let { places } = this.state;
    localStorage.setItem(`places`, JSON.stringify(places));
  }

  removeItem = (id) => {
    let { places } = this.state;
    places.splice(id, 1);
    this.setState({ places });
  }

  render() {
    let { places } = this.state;
    const conditionItems =  places.map( (place, index) => {
      let uniqueKey = (index + 1);
      return <Conditions key={uniqueKey} id={place.id} city={place.id} data={place.data} removeItem={this.removeItem}/>
    })
    return (
      <div>
        <div className="conditions-heading">
          <h1>Current Conditions</h1>
          <p>To see details and a 10-day forecast, tap or click a card.</p>
        </div>
          <div className="weather-container">
            {conditionItems}
          </div>
      </div>
    )
  }
}

export default ConditionsList
