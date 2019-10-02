tokenGlobal = require('./service/token')



// import './events'

window.onload = () => {
  if (tokenGlobal.get()) logIn()
}

const authorize = () => {
  let user = getNames();

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
  clearData()

  getCurrentUserData(tokenGlobal.get()).then(data => {
    drawInfo(data)
    currentUser.data = data;
  })
  getCurrentUserTasks(tokenGlobal.get()).then(list => {
    drawList(list)
    currentUser.tasks = list;
    updateCounter()
  })

  document.body.setAttribute('class', 'loggedIn');
}

const logOut = () => {
  currentUser.logged = false;
  document.body.removeAttribute('class');
  tokenGlobal.remove()
}

let currentUser = {
  logged: false,
  token: tokenGlobal.get(),
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
let userDataBlock = document.getElementById('loginData');
let taskListBlock = document.getElementById('task_list');

const clearData = () => {
  userDataBlock.innerHTML = ''
  taskListBlock.innerHTML = ''
}

const drawInfo = (userData) => {
  userDataBlock.innerHTML += 'username  - ' + userData['username'] + '<br>'
  userDataBlock.innerHTML += 'password  - ' + userData['password'] + '<br>'
  userDataBlock.innerHTML += 'id  - ' + userData['_id'] + '<br>'
}

const drawList = (userList) => {
  let listString = ''

  if (userList.length)
    userList.forEach(item => {
      listString += drawListItem(item)
    });
  else
    listString = `<li>No tasks available</li>`

  taskListBlock.innerHTML = listString
}

const drawListItem = (item) => {
  return `
    <li id="${item._id}" class="task-item ${item.completed ? 'done' : ''}">
    <button>Delete</button>
    ${item.text}
    <span class="date">${item.createdDate}</span>
    </li>  `
  // <button onclick='editTask("${item._id}")'>Edit</button>
}

const updateCounter = () => {
  document.getElementById('taskCounter').innerHTML = 'Total number of notes - ' + currentUser.tasks.length
}
const addUser = () => {
  let user = getNames();
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
      logIn()
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
      logOut()
    })
    .catch(err => { console.log(err) })
}

const addTask = () => {
  let taskText = document.getElementById('taskText').value
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
        document.getElementById('task_list').innerHTML = ''
      document.getElementById('task_list').innerHTML += drawListItem(data)
      currentUser.tasks.push(data)
      updateCounter()
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

const toggleComplete = () => {
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
          updateCounter()
          if (currentUser.tasks.length === 0)
            drawList([])
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

const getAllUsers = () => {
  fetch(address + '/api/users')
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
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


// tasks

const getAllTasks = () => {
  fetch(address + '/api/tasks')
    .then(res => res.json())
    .then(data => { console.log(data); return data })
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
const getNames = () => {
  return {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  }
}





const addClick = (func, id) => {
  document.getElementById(id).addEventListener('click', func)
  // document.getElementById(`${id}`).addEventListener('click', func)
}

addClick(getAllTasks, 'buttonGetAllTasks')
addClick(deleteAllTasks, 'buttonDeleteAllUsers')
addClick(getAllUsers, 'buttonGetAllUsers')
addClick(deleteAllUsers, 'buttonDeleteAllTasks')
addClick(addUser, 'buttonAddUser')
addClick(deleteUser, 'buttonDeleteUser')
addClick(addTask, 'buttonAddTask')
addClick(getCurrentTasks, 'buttonGetCurrentTasks')
addClick(authorize, 'buttonAuthorize')
addClick(logOut, 'buttonLogout')

addClick(toggleComplete, 'task_list')
addClick(deleteTask, 'task_list')

let address = "http://localhost:8080"
