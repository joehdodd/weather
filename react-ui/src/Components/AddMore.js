import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddMore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPlace: ''
    }
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
    const { isNewPlace } = this.props;
    if(!!isNewPlace) {
      e.preventDefault()
      let { newPlace } = this.state;
      this.props.newPlace(newPlace);
    } else {
      e.preventDefault()
      let { newPlace } = this.state;
      this.props.geoLocateSearch(newPlace);
    }

  }

  render() {
    let { newPlace } = this.state;
    return (
      <div>
        <div className="conditions-heading">
          <h1>{this.props.searchType}</h1>
        </div>
          <div className="add-more-container">
            <form>
            <label htmlFor={newPlace}>{this.props.labelText}</label>
              <input
                type="text"
                id={newPlace}
                name="newPlace"
                value={newPlace}
                onChange={this.handleChange}
              />
              <button className="button" type="submit" onClick={ (e) => { this.handleSubmit(e) }}>Add</button>
            </form>
          </div>
      </div>
    )
  }
}

AddMore.propTypes = {
  labelText: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
}




export default AddMore
