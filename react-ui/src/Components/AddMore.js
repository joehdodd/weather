import React, { Component } from 'react';

class AddMore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPlace: '',
      searchPlaces: []
    }
  }

  componentWillReceiveProps(nextProps) {
    let searchPlaces = nextProps.searchPlaces;
    if (!!searchPlaces) {
      this.setState({
        searchPlaces: [...searchPlaces]
      })
    }
  }

  returnPlaces = () => {
    return !!this.state.searchPlaces ? this.state.searchPlaces.map(place => {
      return (
        <li
          key={place.formatted_address}
          className="search-item"
          onClick={() => { this.handlePlaceClick(place) }}
        >
          {place.formatted_address}
        </li>
      )
    }) : null
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let { newPlace } = this.state;
    this.props.sendRequest('/api/gm', newPlace);
  }

  handlePlaceClick = (place) => {
    console.log(place);
    this.props.sendRequest('/api/ds', place.geometry.location)
  }

  render() {
    let { newPlace, searchPlaces } = this.state;
    return (
      <div className="add-more-container" style={{width: 450}}>
        <form style={{ textAlign: 'right', width: 255}}>
          <input
            type="text"
            id={newPlace}
            name="newPlace"
            value={newPlace}
            onChange={this.handleChange}
            placeholder={this.props.placeHolder}
          />
          <button className="button" type="submit" onClick={ (e) => { this.handleSubmit(e) }}>Add</button>
        </form>
        { (!!searchPlaces && !!searchPlaces.length) &&
          <ul className="search-drop" style={{listStyle: 'none'}}>
            {this.returnPlaces()}
          </ul>
        }
      </div>
    )
  }
}

export default AddMore
