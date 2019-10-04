
const address = require('./../service/_address')

const getAllTasks = () => {
  fetch(address + '/api/tasks')
    .then(res => res.json())
    .then(data => { console.log(data); })
    .catch(err => { console.log(err) })
}

const deleteAllTasks = () => {
  fetch(address + '/api/tasks/clear', {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}

const getAllUsers = () => {
  fetch(address + '/api/users')
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}

const deleteAllUsers = () => {
  fetch(address + '/api/users/clear', {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}

module.exports = {
  getAllTasks,
  getAllUsers,
  deleteAllTasks,
  deleteAllUsers
}