import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import IconSearch from '../images/components/IconSearch';


class SearchAutoComplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: 'New York, NY',
      expand: false
    }
    this.onChange = (address) => this.setState({ address })
  }

  handleExpand = () => {
    this.setState( prevState => ({
      expand: !prevState.expand
    }));
  }

  handleFormSubmit = () => {
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.sendRequest('/api/ds', latLng);
        console.log(latLng);
      })
      .catch(error => {
        console.error('Error', error)
      })
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    const classes = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'autocomplete-container',
      autocompleteItem: 'autocomplete-result',
    }

    return (
      <div className="search-container">
        <div className={`search-form-container ${this.state.expand && "animate-search-form-container"}`}>
          <form onSubmit={this.handleFormSubmit}>
            <PlacesAutocomplete
              inputProps={inputProps}
              classNames={classes}
            />
          </form>
        </div>
        <span
          className="search-icon-container"
          onClick={() => {
            !this.state.expand
            ? this.handleExpand()
            : this.handleFormSubmit()
          }}
        >
          <IconSearch
            width={{width: '24px', height: '24px'}}
            iconColor="#73c8a9"
          />
        </span>
      </div>
    )
  }
}

export default SearchAutoComplete;
