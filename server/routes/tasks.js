let { statuses, httpStatuses } = require('../config/constants');
let express = require('express');
let router = express.Router();

let List = require('../database/tasks');

router.get('/tasks', (req, res) => {
  if (req.user) {
    // tasks for current user (if headers specified)
    List.getTasks({ userId: req.user._id })
      .then(users => { res.json(users) })
      .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, users: {}, error_text: err.message }) });
  } else {
    //all tasks
    List.getTasks()
      .then(users => { res.json(users) })
      .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, users: {}, error_text: err.message }) });
  }
});

router.post('/tasks', (req, res) => {
  List.addTask(req.body.text, req.user)
    .then(newTask => res.send(newTask))
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
});

router.put('/tasks/:id', (req, res) => {
  if (req.query.compl) {
    List.getTask(req.params.id)
      .then(thisTask => {
        List.updateCompleted({ _id: req.params.id }, !thisTask.completed)
          .then(newTask => {
            res.json(newTask)
          })
          .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
      })
  }
  // res.send('updated')
})
router.delete('/tasks/:id', (req, res) => {
  List.removeTask(req.params.id)
    .then(thisTask => { res.json(thisTask) })
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
})

//service - delete all tasks
router.delete('/tasks/clear', (req, res) => {
  //delete user's tasks
  List.removeAllTasks()
    .then(data => res.json(data))
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
})

module.exports = router;