const currentUser = require('./../service/store')
const tokenGlobal = require('./../service/token')
const address = require('./../service/_address')
const draw = require('./../draw/draw')
const drawBlocks = require('./../draw/draw.blocks')
const counter = require('./taskCounter')

const authorize = () => {
  let user = {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  };

  if (!!user.username & !!user.password) {

    let query = '?'
    query += 'username=' + user.username + '&'
    query += 'password=' + user.password + '&'

    fetch(address + '/api/login' + query)
      .then(res => {
        if (res.status === 401) {
          drawBlocks.loginPrompt.innerHTML = "User doesn't exist. Register!"
          return false
        }
        return res.json()
      })
      .then(token => {
        if (token) {
          tokenGlobal.set(token)
          logIn()
        }
        else {
          logOut()
        }
      })
      .catch(err => { console.log(err) })
  } else {
    drawBlocks.loginPrompt.innerHTML = "Enter username and password"
    if (user.username) {
      drawBlocks.loginPrompt.innerHTML = "Enter password"
    }
    if (user.password) {
      drawBlocks.loginPrompt.innerHTML = "What is your name?"
    }
  }
}

const logIn = () => {
  draw.clear()

  getCurrentUserData(tokenGlobal.get()).then(data => {
    drawBlocks.info.innerHTML = draw.info(data)
    currentUser.data = data;
  })

  getCurrentUserTasks(tokenGlobal.get()).then(list => {
    drawBlocks.list.innerHTML = draw.list(list)
    currentUser.tasks = list;
    counter.update()
  })

  document.body.setAttribute('class', 'loggedIn');
}

const logOut = () => {
  document.body.removeAttribute('class');
  tokenGlobal.remove()
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
  authorize,
  logIn,
  logOut
}

// const getNames = () => {
//   return {
//     username: document.getElementById('login_name').value,
//     password: document.getElementById('login_pass').value
//   }
// }