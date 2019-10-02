const tokenGlobal = require('./../service/token')
const currentUser = require('./../service/store')
const address = require('./../service/_address')
const draw = require('./../draw/draw')
const drawBlocks = require('./../draw/draw.blocks')
const counter = require('./../user/taskCounter')
const login = require('./../user/authorization')

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

module.exports = {
  addTask,
  deleteTask,
  toggleTaskComplete,
  getCurrentTasks
}