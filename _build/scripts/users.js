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
    .then(token => {
      setToken(token);
      logIn()
    })
    .catch(err => { console.log(err) })
}

const deleteUser = () => {
  fetch('/api/users', {
    method: 'DELETE',
    headers: {
      'authorization': getToken()
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      logOut()
    })
    .catch(err => { console.log(err) })
}
