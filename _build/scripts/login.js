const authorize = async () => {
  let user = getNames();

  let query = '?'
  query += 'username=' + user.username + '&'
  query += 'password=' + user.password + '&'

  return await fetch('/api/login' + query)
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
  document.body.setAttribute('class', 'loggedIn');
}

const logOut = () => {
  document.body.removeAttribute('class');
  removeToken()
}

const setToken = (data) => {
  localStorage.setItem("token", data);
}

const getToken = () => {
  return localStorage.getItem("token")
}

const removeToken = () => {
  return localStorage.removeItem("token")
}

window.onload = () => {
  if (getToken()) logIn()
}