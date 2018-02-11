import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class SearchAutoComplete extends Component {
  constructor(props) {
    super(props)
    this.state = { address: 'New York, NY' }
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.sendRequest('/api/ds', latLng);
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
      <form onSubmit={this.handleFormSubmit} style={{display: 'flex', justifySelf: 'flex-end', width: '100%'}}>
        <PlacesAutocomplete
          inputProps={inputProps}
          classNames={classes}
        />
        <button className="button" type="submit" onClick={this.props.hidePortal}>Submit</button>
      </form>
    )
  }
}

export default SearchAutoComplete;
