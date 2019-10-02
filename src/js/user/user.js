const tokenGlobal = require('./../service/token')
const currentUser = require('./../service/store')
const address = require('./../service/_address')
const draw = require('./../draw/draw')
const drawBlocks = require('./../draw/draw.blocks')
const counter = require('./../user/taskCounter')
const login = require('./../user/authorization')

const addUser = () => {
  let user = {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  };

  fetch(address + '/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  })
    .then(res => res.json())
    .then(token => {
      tokenGlobal.set(token);
      login.logIn()
    })
    .catch(err => { console.log(err) })
}

const deleteUser = () => {
  fetch(address + '/api/users', {
    method: 'DELETE',
    headers: {
      'authorization': tokenGlobal.get()
    }
  })
    .then(res => res.json())
    .then(() => {
      login.logOut()
    })
    .catch(err => { console.log(err) })
}

module.exports = {
  addUser,
  deleteUser
}