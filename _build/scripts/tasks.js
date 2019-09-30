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

const getCurrentTasks = () => {
  fetch('/api/tasks', {
    headers: { 'authorization': getToken() }
  })
    .then(res => res.json())
    .then(data => { console.log(data); return data })
    .catch(err => { console.log(err) })
}

// const getCurrentTasks = (taskId) => {
//   fetch('/api/task' + taskId, {
//     method: "UPDATE",
//     headers: { 'authorization': getToken() }
//   })
//     .then(res => res.json())
//     .then(data => { console.log(data); return data })
//     .catch(err => { console.log(err) })
// }

const completeItem = (data) => { console.log('complete - ' + data); }
const deleteItem = (data) => { console.log('delete - ' + data); event.stopPropagation() }
