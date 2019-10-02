const token = require('./token')

module.exports = {
  logged: false,
  token: token.get(),
  data: [],
  tasks: []
}