let { statuses, httpStatuses } = require('../config/constants');
let express = require('express');
let router = express.Router();

let List = require('../database/tasks');

router.get('/tasks', (req, res) => {
  List.getTasks(req.user._id)
    .then(users => { res.json(users) })
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, users: {}, error_text: err.message }) });
});

// router.get('/tasks/:id', (req, res) => {
//   Users.getUserById(req.params.id)
//     .then(user => { res.json(user) })
//     .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
// });

router.post('/tasks', (req, res) => {
  List.addTask(req.body.text, req.user)
    .then(newTask => res.send(newTask))
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
});

router.delete('/tasks/clear', (req, res) => {
  //delete user's tasks
  List.removeAllTasks()
    .then(data => res.json(data))
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
})

module.exports = router;