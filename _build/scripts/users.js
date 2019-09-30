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
    .then(token => { setToken(token); /*user logged in*/ })
    .catch(err => { console.log(err) })
}

// const getUser = (id) => {
//   fetch('/api/users/' + id)
//     .then(res => res.json())
//     .then(data => {
//       console.log('getUser - ' + data)
//       // return data
//     })
//     .catch(err => { console.log(err) })
// }

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
    })
    .catch(err => { console.log(err) })
}

// //output

// let savedUser = { data: {}, list: {} }

// const saveUser = (token) => {
//   drawData.clear()
//   getUserByToken(token).then(data => {
//     console.log(data)
//     // savedUser.data = data;
//     // drawData.info(data)
//   })
//   getTasksByToken(token).then(list => {
//     savedUser.list = list;
//     drawData.list(list)
//   })
// }

// window.onload = () => {
// }



// const getUserByToken = async (token) => {
//   return await fetch('/api/users/token', {
//     headers: { 'authorization': token }
//   })
//     .then(res => res.json())
//     .then(res => {
//       return res
//     })
//     .catch(err => { console.log(err) })
// }