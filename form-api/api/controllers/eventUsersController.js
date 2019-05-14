'use strict';

var mongoose = require('mongoose'),
  EventUser = mongoose.model('EventUsers');

exports.allUsers = function(req, res) {
  EventUser.find({}, function(err, EventUser) {
    if (err) res.send(err);
    res.json(EventUser);
  });
};

exports.addUser = function(req, res) {
  var newEventUser = new EventUser(req.body);
  EventUser.find(
    { email: newEventUser.email, eventDate: newEventUser.eventDate },
    function(err, docs) {
      if (docs.length) {
        res.send('Email exists already');
      } else {
        newEventUser.save(function(err, EventUser) {
          if (err) res.send(err);
          res.json(EventUser);
        });
      }
    }
  );
};
