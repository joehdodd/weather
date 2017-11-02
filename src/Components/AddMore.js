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
    e.preventDefault()
    let { newPlace } = this.state;
    this.props.newPlace(newPlace);
  }

  render() {
    let { newPlace } = this.state;
    return (
      <div>
        <div className="conditions-heading">
          <h1>Add a new place</h1>
        </div>
          <div className="add-more-container">
            <form>
            <label htmlFor={newPlace}>Add a new city by searching in the field below.</label>
              <input
                type="text"
                id={newPlace}
                name="newPlace"
                value={newPlace}
                onChange={this.handleChange}
              />
              <button className="button" type="button" onClick={ (e) => { this.handleSubmit(e) }}>Add</button>
            </form>
          </div>
      </div>
    )
  }
}

export default AddMore
