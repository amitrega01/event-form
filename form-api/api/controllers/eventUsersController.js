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
          message: `${newEventUser.email} already signed up for ${moment(
            newEventUser.eventDate
          ).format('DD-MM-YYYY')}`,
          added: false,
        };
        console.log(data);
        res.json(data);
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
