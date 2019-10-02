const tokenGlobal = require('./service/token')
const draw = require('./draw')
const drawBlocks = require('./draw.blocks')
const currentUser = require('./store')
const counter = require('./user/counter')
const address = require('./service/_address')
const login = require('./authorization')



// import './events'

window.onload = () => {
  if (tokenGlobal.get()) login.logIn()
}

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

const addTask = () => {
  let taskText = document.getElementById('taskText').value
  if (taskText)
    fetch(address + '/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': tokenGlobal.get()
      },
      body: JSON.stringify({
        text: taskText
      })
    })
      .then(res => res.json())
      .then(data => {
        if (currentUser.tasks.length === 0)
          drawBlocks.list.innerHTML = ''
        console.log(drawBlocks)
        drawBlocks.list.innerHTML += draw.item(data)
        currentUser.tasks.push(data)
        counter.update()
      })
      .catch(err => { console.log(err) })
}

const getCurrentTasks = () => {
  fetch(address + '/api/tasks', {
    headers: { 'authorization': tokenGlobal.get() }
  })
    .then(res => res.json())
    .then(data => { console.log(data); return data })
    .catch(err => { console.log(err) })
}

const toggleTaskComplete = () => {
  if (event.target.nodeName === "LI") {
    let evt = event;
    let taskId = evt.target.id
    fetch(address + '/api/tasks/' + taskId + '?compl=true', {
      method: "PUT",
      headers: { 'authorization': tokenGlobal.get() }
    })
      .then(res => res.json())
      .then(() => {
        evt.target.classList.toggle('done')
      })
      .catch(err => { console.log(err) })
  }
}

const deleteTask = (taskId) => {

  if (event.target.parentElement.nodeName === "LI") {
    if (event.target.nodeName === "BUTTON" && event.target.innerText === "Delete") {

      let evt = event;
      let taskId = evt.target.parentElement.id
      fetch(address + '/api/tasks/' + taskId + '?compl=true', {
        method: "DELETE",
        headers: { 'authorization': tokenGlobal.get() }
      })
        .then(res => res.json())
        .then(() => {

          currentUser.tasks = currentUser.tasks.filter(item => item._id !== evt.target.parentElement.id)
          evt.target.parentElement.remove()
          counter.update()
          if (currentUser.tasks.length === 0)
            draw.list([])
        })
        .catch(err => { console.log(err) })
      evt.stopPropagation()
    }
  }
}


// const editTask = (taskId) => {
//   console.log('UpdateTask')

//   if(event.target.innerText === 'Edit' ){
//     event.target.innerText = "Save"
//     event.target.parentElement.contenteditable = true
//   }
//   console.log(event.target.innerText)
// }

// tasks

const addClick = (func, id) => {
  document.getElementById(id).addEventListener('click', func)
  // document.getElementById(`${id}`).addEventListener('click', func)
}

const tempReq = require('./temp/requests')

addClick(tempReq.getAllTasks, 'buttonGetAllTasks')
addClick(tempReq.deleteAllTasks, 'buttonDeleteAllTasks')
addClick(tempReq.getAllUsers, 'buttonGetAllUsers')
addClick(tempReq.deleteAllUsers, 'buttonDeleteAllUsers')


addClick(addUser, 'buttonAddUser')
addClick(deleteUser, 'buttonDeleteUser')
addClick(addTask, 'buttonAddTask')
addClick(getCurrentTasks, 'buttonGetCurrentTasks')
addClick(login.authorize, 'buttonAuthorize')
addClick(login.logOut, 'buttonLogout')

addClick(toggleTaskComplete, 'task_list')
addClick(deleteTask, 'task_list')


const getNames = () => {
  return {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  }
}