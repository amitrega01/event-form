import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import PopUp from './components/PopUp';
import MainForm from './components/MainForm';
var moment = require('moment');

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log('fetching');
    fetch('http://localhost:3001/eventUsers')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.dispatch({ type: 'FROMDB', users: data });
      });
  }

  async addEventUser(user) {
    var userString = JSON.stringify(user);
    let data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userString,
    };
    console.log('fetching');
    var added = await fetch('http://localhost:3001/eventUsers', data)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return {
          added: data.added,
          message: data.message,
        };
      });
    console.log(added);
    if (added.added) {
      console.log('DODAWNAIE DO STATE');
      this.props.dispatch({
        type: 'SIGNUP_OK',
        user: user,
        message: added.message,
      });
    } else {
      this.props.dispatch({ type: 'SIGNUP_NOTOK', message: added.message });
    }
    console.log(this.props.eventUsers);
  }

  render() {
    const table = this.props.eventUsers.map(item => (
      <li className='listItem' key={item._id ? item._id : item.toString()}>
        <span className='name'>
          {item.firstName} {item.lastName}
        </span>

        <span className='email'>{item.email}</span>
        <span className='date'>
          {moment(item.eventDate.toString()).format('DD-MM-YYYY')}
        </span>
      </li>
    ));
    return (
      <div className='App'>
        <PopUp
          visible={this.props.visible}
          close={() => this.props.dispatch({ type: 'CLOSE_POPUP' })}
          message={this.props.message}
        />
        <header>
          <h1>Sign up for event</h1>
        </header>
        <MainForm signUp={user => this.addEventUser(user)} />
        <ul>{table}</ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  eventUsers: state.eventUsers,
  visible: state.popUp.visible,
  message: state.popUp.message,
});
export default connect(mapStateToProps)(App);
