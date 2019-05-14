import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './MainForm.css';
import { CLIENT_RENEG_LIMIT } from 'tls';

const today = new Date();

export class MainForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    date: today,
  };
  handleDateChange(date) {
    this.setState({ date: date >= today ? date : today });
    if (date < today) alert("We can't get you back in time!");
  }
  handleSubmit = event => {
    console.log(this.state);
    this.props.signUp(this.state);

    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className='form'>
        <label>Email: </label>
        <input
          type='email'
          onChange={event => {
            this.setState({ email: event.target.value });
            console.log(event.target.value);
          }}
          value={this.state.email}
        />
        <label>First Name:</label>
        <input
          type='text'
          onChange={event => this.setState({ firstName: event.target.value })}
          value={this.state.firstName}
        />
        <label>Last Name:</label>
        <input
          type='text'
          onChange={event => this.setState({ lastName: event.target.value })}
          value={this.state.lastName}
        />
        <label>Event date:</label>
        <DatePicker
          onChange={date => this.handleDateChange(date)}
          selected={this.state.date}
        />

        <input className='button' type='submit' value='Submit' />
      </form>
    );
  }
}

export default connect()(MainForm);
