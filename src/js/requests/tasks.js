const variables = require('./../_variables.js')
let address = variables.request

let { token } = require('./../requests/login')

const addTask = () => {
  let taskText = document.getElementById('taskText').value
  fetch(address + '/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token.getToken()
    },
    body: JSON.stringify({
      text: taskText
    })
  })
    .then(res => res.json())
    .then(data => {
      updateCounter()
      if (currentUser.tasks.length === 0)
        document.getElementById('task_list').innerHTML = ''
      document.getElementById('task_list').innerHTML += drawListItem(data)
      currentUser.tasks.push(data)
    })
    .catch(err => { console.log(err) })
}

const getCurrentTasks = () => {
  fetch(address + '/api/tasks', {
    headers: { 'authorization': token.getToken() }
  })
    .then(res => res.json())
    .then(data => { console.log(data); return data })
    .catch(err => { console.log(err) })
}

const toggleComplete = (taskId) => {
  if (event.target.nodeName === "LI") {
    let evt = event;
    fetch(address + '/api/tasks/' + taskId + '?compl=true', {
      method: "PUT",
      headers: { 'authorization': token.getToken() }
    })
      .then(res => res.json())
      .then(() => { evt.target.classList.toggle('done') })
      .catch(err => { console.log(err) })
  }
}

const deleteTask = (taskId) => {
  let evt = event;
  fetch(address + '/api/tasks/' + taskId + '?compl=true', {
    method: "DELETE",
    headers: { 'authorization': token.getToken() }
  })
    .then(res => res.json())
    .then(() => {
      updateCounter()

      currentUser.tasks = currentUser.tasks.filter(item => item._id !== evt.target.parentElement.id)
      evt.target.parentElement.remove()
      if (currentUser.tasks.length === 0)
        drawList([])
    })
    .catch(err => { console.log(err) })
  evt.stopPropagation()
}

module.exports = {
  addTask,
  getCurrentTasks,
  toggleComplete,
  deleteTask
}

// const editTask = (taskId) => {
//   console.log('UpdateTask')

//   if(event.target.innerText === 'Edit' ){
//     event.target.innerText = "Save"
//     event.target.parentElement.contenteditable = true
//   }
//   console.log(event.target.innerText)
// }