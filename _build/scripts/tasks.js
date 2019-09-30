
const addTask = () => {
  let taskText = document.getElementById('taskText').value
  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getToken()
    },
    body: JSON.stringify({
      text: taskText
    })
  })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}

const getTasks = () => {
  fetch('/api/tasks', {
    headers: {
      'authorization': getToken()
    }
  })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}

const removeAllTasks = () => {

  fetch('/api/tasks/clear', {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}