
const logIn = () => {
  let user = getNames();

  let query = '?'
  query += 'username=' + user.username + '&'
  query += 'password=' + user.password + '&'

  fetch('/api/login' + query)
    .then(res => res.json())
    .then(token => { setToken(token) })
    .catch(err => { console.log(err) })
}

const setToken = (data) => {
  localStorage.setItem("token", data);
  console.log('token - ' + data)
}

const getToken = () => localStorage.getItem("token")
