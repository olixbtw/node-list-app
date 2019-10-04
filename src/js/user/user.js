const tokenGlobal = require('./../service/token')
const address = require('./../service/_address')
const login = require('./authorization')
const drawBlocks = require('./../draw/draw.blocks')
const draw = require('./../draw/draw')
const Tasks = require('./../task/task')

const addUser = () => {
  let user = {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  };

  if (!!user.username & !!user.password)
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
        if (token.status !== 'FAILURE') {
          tokenGlobal.set(token);
          login.logIn()
        }
      })
      .catch(err => { console.log(err) })
  else {
    drawBlocks.loginPrompt.innerHTML = "Enter username and password"
    if (user.username) {
      drawBlocks.loginPrompt.innerHTML = "Enter password"
    }
    if (user.password) {
      drawBlocks.loginPrompt.innerHTML = "What is your name?"
    }
  }
}

const deleteUser = () => {
  fetch(address + '/api/users', {
    method: 'DELETE',
    headers: { 'authorization': tokenGlobal.get() }
  })
    // .then(res => res.json())
    .then(() => {
      //delete user's tasks
      Tasks.deleteUsersTasks().then(
        login.logOut()
      )
    })
    .catch(err => { console.log(err) })
}

const updateUser = (key, value) => {
  fetch(address + '/api/users', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'authorization': tokenGlobal.get()
    },
    body: JSON.stringify({
      val: value,
      key: key,
    })

  })
    // .then(res => res.json())
    .then(() => {
      document.getElementById(key).innerText = value
    })
    .catch(err => { console.log(err) })
}

const allUsersInfo = () => {
  fetch(address + '/api/users/tasks')
    .then(res => res.json())
    .then(data => {
      drawBlocks.allUsers.parentElement.classList.remove('hidden')
      drawBlocks.allUsers.innerHTML = draw.allUsers(data)
    })
    .catch(err => { console.log(err) })
}

// const allUsersInfoHide = () => {
//   drawBlocks.allUsers.parentElement.classList.add('hidden')
// }

module.exports = {
  add: addUser,
  delete: deleteUser,
  update: updateUser,
  dispalyAll: allUsersInfo,
  // hideAll: allUsersInfoHide
}