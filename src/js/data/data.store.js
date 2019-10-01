let currentUser = {
  logged: false,
  token: getToken(),
  data: [],
  tasks: []
}

const getCurrentUserData = async (token) => {
  return await fetch('/api/users', {
    headers: { 'authorization': token }
  }).then(res => res.json())
    .then(user => { return user })
    .catch(err => { console.log(err) })
}

const getCurrentUserTasks = async (token) => {
  return await fetch('/api/tasks', {
    headers: { 'authorization': token }
  }).then(res => res.json())
    .then(tasks => {return tasks })
    .catch(err => { console.log(err) })
}