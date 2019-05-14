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
  console.log(newEventUser);
  EventUser.find(
    { email: newEventUser.email, eventDate: newEventUser.eventDate },
    function(err, docs) {
      if (docs.length) {
        let err = {
          err: `User ${newEventUser.email} alredy signed up for ${
            newEventUser.eventDate
          }`,
        };
        res.send(JSON.stringify(err));
      } else {
        newEventUser.save(function(err, EventUser) {
          if (err) res.send(err);
          res.json(EventUser);
        });
      }
    }
  );
};
