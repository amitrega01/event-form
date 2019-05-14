import React from 'react';
import './App.css';
import { MainForm } from './components/MainForm';

import { connect } from 'react-redux';
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.eventUsers);
  }

  render() {
    const list = this.props.eventUsers.map(item => <li>{item.email}</li>);
    return (
      <div className='App'>
        <h1>Sign up for event</h1>
        <MainForm
          signUp={user => {
            console.log(user);
            this.props.dispatch({
              type: 'SIGNUP',
              user: user,
            });
          }}
        />
        <ul>{list}</ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  eventUsers: state.eventUsers,
});
export default connect(mapStateToProps)(App);
