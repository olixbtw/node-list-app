let { statuses, httpStatuses } = require('../config/constants');
let express = require('express');
let router = express.Router();

let Users = require('../database/users');
let List = require('../database/tasks');

router.get('/users', (req, res) => {
  if (req.user) {
    Users.getUserById(req.user._id)
      .then(user => { res.json(user) })
      .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
  } else {
    Users.getUsers()
      .then(users => { res.json(users) })
      .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, users: {}, error_text: err.message }) });
  }
});

router.get('/users/tasks', (req, res) => {
  Users.getUsers()
    .then(users => {
      let promiseArr = users.map(currentUser => List.getTasks({ userId: currentUser._id }))
      Promise.all(promiseArr)
        .then(val => {
          val = val.map((item, index) => {
            return {
              user: users[index].username,
              itemQ: item.length
            }
          })
          res.json(val)
        })
    })
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, users: {}, error_text: err.message }) });
})

router.post('/users', (req, res) => {
  //check if user is unique
  Users.addUser(req.body.username, req.body.password)
    .then(newUser => {
      let query = '?'
      query += 'username=' + newUser.username + '&'
      query += 'password=' + newUser.password + '&'

      res.redirect('login/' + query);
    })
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
});

router.put('/users', (req, res) => {
  if (req.user) {
    let change = {}
    change[req.body.key] = req.body.val
    Users.updateUser({ _id: req.user._id }, change)
      .then(() => { res.send() })
      .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
  }
});

router.delete('/users', (req, res) => {
  //delete user's tasks
  if (req.user) {
    if (req.user._id)
      Users.removeUser(req.user._id)
        .then(data => res.json(data))
        .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
  } else
    res.status(httpStatuses.LOGIN).send('No such user')
})

//service - delete all users
router.delete('/users/clear', (req, res) => {
  Users.removeAllUsers()
    .then(data => res.json(data))
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
})

module.exports = router;