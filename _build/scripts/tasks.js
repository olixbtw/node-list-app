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

// const getTasksByToken = async (token) => {
//   return await fetch('/api/tasks', {
//     headers: { 'authorization': token }
//   })
//     .then(res => res.json())
//     .then(data => { console.log('token tasks' + data); return data })
//     .catch(err => { console.log(err) })
// }


const getCurrentTasks =  () => {
  fetch('/api/tasks', {
    headers: { 'authorization': getToken() }
  })
    .then(res => res.json())
    .then(data => { console.log(data); return data })
    .catch(err => { console.log(err) })
}