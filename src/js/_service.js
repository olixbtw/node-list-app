const getAllUsers = () => {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => { console.log(err) })
}

const deleteAllUsers = () => {
  fetch('/api/users/clear', {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}


// tasks

const getAllTasks = () => {
  fetch('/api/tasks')
    .then(res => res.json())
    .then(data => { console.log(data); return data })
    .catch(err => { console.log(err) })
}

const deleteAllTasks = () => {
  fetch('/api/tasks/clear', {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}