var mongoose = require('mongoose'),
  EventUser = mongoose.model('EventUsers');
var moment = require('moment');
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
        let data = {
          message: `User ${newEventUser.email} already signed up for ${
            newEventUser.eventDate
          }`,
          added: false,
        };
        console.log(data);
        res.send(JSON.stringify(data));
      } else {
        newEventUser.save(function(err, EventUser) {
          if (err) res.send(err);
          res.json({
            added: true,
            message: 'Added successfully!',
            user: EventUser,
          });
        });
      }
    }
  );
};
