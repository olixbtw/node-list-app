const addUser = () => {
  let user = getNames();
  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  })
    .then(res => res.json())
    .then(token => { setToken(token) })
    .catch(err => { console.log(err) })
}


const getUsers = () => {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => { console.log(err) })
}