
const addTask = () => {
  let taskText = document.getElementById('taskText').value
  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: taskText,
      token: localStorage.getItem('token')
    })
  })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}


// let statusBlock = document.getElementById('loginStatus')