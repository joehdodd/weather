import React, { Component } from 'react';

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
      this.props.geoLocateSearch(null, newPlace);
    }

  }

  render() {
    let { newPlace } = this.state;
    return (
      <div className="add-more-container">
        <form style={{ textAlign: 'right'}}>
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
      </div>
    )
  }
}

export default AddMore
