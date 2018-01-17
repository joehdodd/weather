import React, { Component } from 'react';
import Conditions from './Conditions';

class ConditionsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places : []
    }
  }

  componentWillReceiveProps(nextProps) {
    let newPlace = nextProps.places;
    this.setState( prevState => ({
      places: [...prevState.places, ...newPlace]
    }));
  }

  getConditionItems = () => {
    let { places } = this.props;
    places.map( (place, index) => {
      let uniqueKey = (index + 1);
      return <Conditions key={uniqueKey} id={place.id} city={place.id} data={place.data} removeItem={this.removeItem}/>
    })
  }

  render() {
    let { places } = this.props;
    let conditionItems = places.map( (place, index) => {
      let uniqueKey = (index + 1);
      return <Conditions key={uniqueKey} id={place.id} city={place.id} data={place.data} removeItem={this.props.removeItem}/>
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
