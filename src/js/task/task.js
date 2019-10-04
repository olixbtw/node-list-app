const tokenGlobal = require('./../service/token')
const currentUser = require('./../service/store')
const address = require('./../service/_address')
const draw = require('./../draw/draw')
const drawBlocks = require('./../draw/draw.blocks')
const counter = require('./../user/taskCounter')

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
  if (event.target.nodeName === "DIV" || event.target.parentNode.nodeName === "LI") {
    let evt = event.target.parentNode;
    fetch(address + '/api/tasks/' + evt.id, {
      method: "PUT",
      headers: { 'authorization': tokenGlobal.get() }
    })
      // .then(res => res.json())
      .then(() => { evt.classList.toggle('done') })
      .catch(err => { console.log(err) })
  }
}

const deleteUsersTasks = async () => {
  return await fetch(address + '/api/tasks', {
    method: 'DELETE',
    headers: { 'authorization': tokenGlobal.get() }
  })
    .then(res => res.json())
    .catch(err => { console.log(err) })
}

const deleteTask = () => {
  if (event.target.parentElement.nodeName === "LI") {
    if (event.target.nodeName === "BUTTON" && event.target.innerText === "Delete") {
      event.stopImmediatePropagation()

      let evt = event;
      let taskId = evt.target.parentElement.id
      fetch(address + '/api/tasks/' + taskId, {
        method: "DELETE",
        headers: { 'authorization': tokenGlobal.get() }
      })
        // .then(res => res.json())
        .then(() => {
          currentUser.tasks = currentUser.tasks.filter(item => item._id !== evt.target.parentElement.id)
          evt.target.parentElement.remove()
          counter.update()
          if (currentUser.tasks.length === 0)
            draw.list([])
        })
        .catch(err => { console.log(err) })
    }
  }
}

const updateTask = (taskId, taskText) => {
  fetch(address + '/api/tasks', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'authorization': tokenGlobal.get()
    },
    body: JSON.stringify({
      val: taskText,
      id: taskId,
      key: 'text',
    })

  })
    // .then(res => res.json())
    .then(() => {
      document.getElementById(taskId).getElementsByTagName('div')[0].innerText = taskText
    })
    .catch(err => { console.log(err) })
}

module.exports = {
  add: addTask,
  delete: deleteTask,
  update: updateTask,
  toggleTaskComplete,
  getCurrentTasks,
  deleteUsersTasks
}