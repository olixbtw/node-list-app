//token
const setToken = (data) => {
  localStorage.setItem("token", data)
  return data
}

const getToken = () => {
  return localStorage.getItem("token")
}

const removeToken = () => {
  localStorage.removeItem("token")
}

module.exports = {
  set: setToken,
  get: getToken,
  remove: removeToken
}