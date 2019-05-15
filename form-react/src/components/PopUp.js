import React, { Component } from 'react';
import './PopUp.css';

export class PopUp extends Component {
  render() {
    if (this.props.visible)
      return (
        <div className='wrapper'>
          <div className='content'>
            <h1 className='text'>{this.props.message}</h1>
            <button onClick={this.props.close}>Go back</button>
          </div>
        </div>
      );
    else return null;
  }
}

export default PopUp;
