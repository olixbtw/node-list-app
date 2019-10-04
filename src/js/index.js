const tempReq = require('./service/_tempRequests')
const tokenGlobal = require('./service/token')
const login = require('./user/authorization')
const modal = require('./draw/modal')
const User = require('./user/user')
const Task = require('./task/task')

window.onload = () => { if (tokenGlobal.get()) login.logIn() }
const addClick = (func, id) => { document.getElementById(id).addEventListener('click', func) }

addClick(tempReq.getAllTasks, 'buttonGetAllTasks')
addClick(tempReq.deleteAllTasks, 'buttonDeleteAllTasks')
addClick(tempReq.getAllUsers, 'buttonGetAllUsers')
addClick(tempReq.deleteAllUsers, 'buttonDeleteAllUsers')

addClick(login.authorize, 'buttonAuthorize')
addClick(login.logOut, 'buttonLogout')

addClick(User.add, 'buttonAddUser')
addClick(User.delete, 'buttonDeleteUser')

addClick(Task.add, 'buttonAddTask')
addClick(Task.getCurrentTasks, 'buttonGetCurrentTasks')

//#task_list event order is important
addClick(modal.init, 'task_list')
addClick(modal.init, 'loginData')
addClick(Task.delete, 'task_list')
addClick(Task.toggleTaskComplete, 'task_list')

addClick(modal.close, 'buttonModalClose')
addClick(modal.save, 'buttonModalSave')


addClick(allUsersInfo, 'allUsersInfo')
function allUsersInfo() { console.log('get info of all users') }