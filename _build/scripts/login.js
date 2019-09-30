
const logIn = () => {
  let user = getNames();

  let query = '?'
  query += 'username=' + user.username + '&'
  query += 'password=' + user.password + '&'

  fetch('/api/login' + query)
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
}
