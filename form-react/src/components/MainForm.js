import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './MainForm.css';

const today = new Date();

export class MainForm extends Component {
  state = {
    firstName: '',
    eventDate: today,
    lastName: '',
    email: '',
  };
  handleDateChange(date) {
    this.setState({ eventDate: date >= today ? date : today });
    if (date < today) alert("We can't get you back in time!");
  }
  handleSubmit = event => {
    this.props.signUp(this.state);

    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className='form'>
        <div className='row'>
          <label>Email: </label>
          <input
            type='email'
            onChange={event => {
              this.setState({ email: event.target.value });
              console.log(event.target.value);
            }}
            required
            value={this.state.email}
          />
        </div>
        <div className='row'>
          <label>First Name:</label>
          <input
            type='text'
            onChange={event => this.setState({ firstName: event.target.value })}
            value={this.state.firstName}
            required
          />
        </div>
        <div className='row'>
          <label>Last Name:</label>
          <input
            type='text'
            onChange={event => this.setState({ lastName: event.target.value })}
            value={this.state.lastName}
            required
          />
        </div>
        <div className='row'>
          <label>Event date:</label>
          <DatePicker
            onChange={date => this.handleDateChange(date)}
            selected={this.state.eventDate}
          />
        </div>
        <input className='button' type='submit' value='Submit' />
      </form>
    );
  }
}

export default connect()(MainForm);
