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
  console.log(req.params.id)
  List.getTask(req.params.id)
    .then(thisTask => {
      console.log(thisTask)
      List.updateTask({ _id: req.params.id }, { completed: !thisTask.completed })
        .then(() => { res.send() })
        .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
    })
})

router.put('/tasks', (req, res) => {
  console.log('PUT')
  if (req.user) {
    let change = {}
    change[req.body.key] = req.body.val
    console.log(change)
    List.updateTask({ _id: req.body.id }, change)
      .then(() => { res.send() })
      .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
  }
});

router.delete('/tasks', (req, res) => {
  List.removeUsersTasks({ userId: req.user._id })
    .then(thisTasks => { res.json(thisTasks) })
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
})

//service - delete all tasks
router.delete('/tasks/clear', (req, res) => {
  //delete user's tasks
  List.removeAllTasks()
    .then(data => res.json(data))
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
})

router.delete('/tasks/:id', (req, res) => {
  List.removeTask(req.params.id)
    .then(thisTask => { res.json(thisTask) })
    .catch(err => { res.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
})

module.exports = router;