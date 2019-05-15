module.exports = function(app) {
  var eventUsers = require('../controllers/eventUsersController');

  app
    .route('/eventUsers')
    .get(eventUsers.allUsers)
    .post(eventUsers.addUser);
};
