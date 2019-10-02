const currentUser = require('./store')
const tokenGlobal = require('./service/token')
const draw = require('./draw')
const drawBlocks = require('./draw.blocks')
// const  drawBlocks = {
//   info: document.getElementById('loginData'),
//   list: document.getElementById('task_list').innerHTML,
//   counter: document.getElementById('taskCounter').innerHTML
// }
const counter = require('./user/counter')
const address = require('./service/_address')

const authorize = () => {  
  let user = {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  };

  let query = '?'
  query += 'username=' + user.username + '&'
  query += 'password=' + user.password + '&'

  fetch(address + '/api/login' + query)
    .then(res => {
      if (res.status === 401)
        return false
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
}

const logIn = () => {  
  currentUser.logged = true;
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
  currentUser.logged = false;
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