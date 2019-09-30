let currentUser = {
  logged: false,
  token: getToken(),
  data: {},
  tasks: {}
}

const getCurrentUserData = async (token) => {
  console.log('getCurrentUserData')
  return await fetch('/api/users', {
    headers: { 'authorization': token }
  }).then(res => res.json())
    .then(user => { console.log(user); return user })
    .catch(err => { console.log(err) })
}

const getCurrentUserTasks = async (token) => {
  console.log('getCurrentUserTasks')
  return await fetch('/api/tasks', {
    headers: { 'authorization': token }
  }).then(res => res.json())
    .then(tasks => { console.log(tasks); return tasks })
    .catch(err => { console.log(err) })
}