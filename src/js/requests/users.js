const variables = require('./../_variables.js')
let address = variables.request

const addUser = () => {
  let user = getNames();
  fetch(address + '/api/users', {
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
  fetch(address + '/api/users', {
    method: 'DELETE',
    headers: {
      'authorization': getToken()
    }
  })
    .then(res => res.json())
    .then(() => {
      logOut()
    })
    .catch(err => { console.log(err) })
}


module.exports = {
  addUser,
  deleteUser
}

const getNames = () => {
  return {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  }
}