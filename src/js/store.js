
const token = require('./service/token')

module.exports = {
  logged: false,
  token: token.get(),
  data: [],
  tasks: []
}