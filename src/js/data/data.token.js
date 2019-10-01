
// token
const setToken = (data) => {
  localStorage.setItem("token", data);
}

const getToken = () => {
  return localStorage.getItem("token")
}

const removeToken = () => {
  return localStorage.removeItem("token")
}