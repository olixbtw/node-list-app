const logIn = () => {
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
    .then(token => { token ? setToken(token) : removeToken() })
    .catch(err => { console.log(err) })
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
