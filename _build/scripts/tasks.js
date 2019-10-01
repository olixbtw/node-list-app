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
  fetch('/api/tasks', {
    headers: { 'authorization': getToken() }
  })
    .then(res => res.json())
    .then(data => { console.log(data); return data })
    .catch(err => { console.log(err) })
}

const toggleComplete = (taskId) => {
  let evt = event;

  fetch('/api/tasks/' + taskId + '?compl=true', {
    method: "PUT",
    headers: { 'authorization': getToken() }
  })
    .then(res => res.json())
    .then(() => { evt.target.classList.toggle('done') })
    .catch(err => { console.log(err) })
}

const deleteItem = (taskId) => {
  let evt = event;
  fetch('/api/tasks/' + taskId + '?compl=true', {
    method: "DELETE",
    headers: { 'authorization': getToken() }
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