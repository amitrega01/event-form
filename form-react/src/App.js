import React from 'react';
import './App.css';
import { MainForm } from './components/MainForm';
import { connect } from 'react-redux';
import PopUp from './components/PopUp';

var moment = require('moment');

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('fetching');
    fetch('http://localhost:3001/eventUsers')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.dispatch({ type: 'FROMDB', users: data });
      });
  }
  state = { visible: false, message: 'Succsesfully added!' };
  render() {
    const table = this.props.eventUsers.map(item => (
      <li className='listItem' key={item._id}>
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
          visible={this.state.visible}
          close={() => this.setState({ visible: false })}
          message={this.state.message}
        />
        <header>
          <h1>Sign up for event</h1>
        </header>
        <MainForm
          signUp={user => {
            this.setState({ visible: true });
            this.props.dispatch({
              type: 'SIGNUP',
              user: user,
            });
          }}
        />
        <ul>{table}</ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  eventUsers: state.eventUsers,
});
export default connect(mapStateToProps)(App);
