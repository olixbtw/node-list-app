
const addClick = (func, id) => {
  document.getElementById(id).addEventListener('click', func)
}

const tempReq = require('./service/_tempRequests')
const tokenGlobal = require('./service/token')
const login = require('./user/authorization')
const User = require('./user/user')
const Task = require('./task/task')

window.onload = () => {
  if (tokenGlobal.get()) login.logIn()
}

addClick(tempReq.getAllTasks, 'buttonGetAllTasks')
addClick(tempReq.deleteAllTasks, 'buttonDeleteAllTasks')
addClick(tempReq.getAllUsers, 'buttonGetAllUsers')
addClick(tempReq.deleteAllUsers, 'buttonDeleteAllUsers')

addClick(login.authorize, 'buttonAuthorize')
addClick(login.logOut, 'buttonLogout')

addClick(User.addUser, 'buttonAddUser')
addClick(User.deleteUser, 'buttonDeleteUser')

addClick(Task.addTask, 'buttonAddTask')
addClick(Task.getCurrentTasks, 'buttonGetCurrentTasks')
addClick(Task.toggleTaskComplete, 'task_list')
addClick(Task.deleteTask, 'task_list')
