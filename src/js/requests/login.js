window.onload = () => {
  if (getToken()) logIn()
}

const authorize = () => {
  let user = getNames();

  let query = '?'
  query += 'username=' + user.username + '&'
  query += 'password=' + user.password + '&'

  fetch('/api/login' + query)
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

//token
const setToken = (data) => {
  localStorage.setItem("token", data);
}

const getToken = () => {
  return localStorage.getItem("token")
}

const removeToken = () => {
  return localStorage.removeItem("token")
}


