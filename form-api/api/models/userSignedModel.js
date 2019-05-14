'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventUser = new Schema({
  firstName: {
    type: String,
    required: 'Enter firstName',
  },
  eventDate: {
    type: Date,
    default: Date.now,
  },
  lastName: {
    type: String,
    required: 'Enter lastName',
  },
  email: {
    type: String,
    required: 'Enter email',
  },
});

module.exports = mongoose.model('EventUsers', EventUser);
