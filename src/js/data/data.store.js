const variables = require('./../_variables.js')
let address = variables.request

let { token } = require('./login')

let currentUser = {
  logged: false,
  token: token.getToken(),
  data: [],
  tasks: []
}

const getCurrentUserData = async (token) => {
  return await fetch(address + '/api/users', {
    headers: { 'authorization': token }
  }).then(res => res.json())
    .then(user => { return user })
    .catch(err => { console.log(err) })
}

const getCurrentUserTasks = async (token) => {
  return await fetch(address + '/api/tasks', {
    headers: { 'authorization': token }
  }).then(res => res.json())
    .then(tasks => { return tasks })
    .catch(err => { console.log(err) })
}

module.exports = {
  currentUser,
  getCurrentUserData,
  getCurrentUserTasks
}

