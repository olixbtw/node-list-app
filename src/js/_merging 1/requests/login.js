// const storage = require('./../data/data.store.js')
// console.log(storage)

const variables = require('./../_variables.js')
let address = variables.request

const authorize = () => {
  let user = getNames();

  let query = '?'
  query += 'username=' + user.username + '&'
  query += 'password=' + user.password + '&'

  fetch(address + '/api/login' + query)
    .then(res => {
      if (res.status === 401)
        return false
      return res.json()
    })
    .then(token => {
      if (token) {
        setToken(token)
        logIn()
      }
      else {
        logOut()
      }
    })
    .catch(err => { console.log(err) })
}

const logIn = () => {
  currentUser.logged = true;
  clearData()

  getCurrentUserData(getToken()).then(data => {
    drawInfo(data)
    currentUser.data = data;
  })
  getCurrentUserTasks(getToken()).then(list => {
    drawList(list)
    currentUser.tasks = list;
    updateCounter()
  })

  document.body.setAttribute('class', 'loggedIn');
}

const logOut = () => {
  currentUser.logged = false;
  document.body.removeAttribute('class');
  removeToken()
}



module.exports = {
  token: {
    setToken,
    getToken,
    removeToken
  },
  authenticator: {
    authorize,
    logIn,
    logOut
  }
}


window.onload = () => {
  if (getToken()) logIn()
}


const getNames = () => {
  return {
    username: document.getElementById('login_name').value,
    password: document.getElementById('login_pass').value
  }
}