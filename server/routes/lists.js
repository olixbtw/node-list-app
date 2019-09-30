let { statuses, httpStatuses } = require('../config/constants');
let express = require('express');
let router = express.Router();

let Users = require('../database/users');

router.get('/users', (req, res) => {
  Users.getUsers()
    .then(users => { res.json(users) })
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, users: {}, error_text: err.message }) });
});

router.get('/users/:id', (req, res) => {
  Users.getUserById(req.params.id)
    .then(user => { res.json(user) })
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
});

router.post('/users', (req, res) => {
  // Users.getUsers()
  //     .then(users => { console.log('check if user unique') })
  Users.addUser(req.body.username, req.body.password)
    .then(newUser => {
      let query = '?'
      query += 'username=' + newUser.username + '&'
      query += 'password=' + newUser.password + '&'

      res.redirect('login/' + query);
    })
    // .then(newUser => res.json(newUser))
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
});

module.exports = router;