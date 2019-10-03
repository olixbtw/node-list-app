
const addClick = (func, id) => {
  document.getElementById(id).addEventListener('click', func)
}

const tempReq = require('./service/_tempRequests')
const tokenGlobal = require('./service/token')
const login = require('./user/authorization')
const modal = require('./draw/modal')
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

addClick(Task.add, 'buttonAddTask')
addClick(Task.getCurrentTasks, 'buttonGetCurrentTasks')

addClick(Task.toggleTaskComplete, 'task_list')
addClick(Task.delete, 'task_list')

// addClick(Task.update.startUpdate, 'task_list')

addClick(modal.close, 'buttonModalClose')
addClick(modal.save, 'buttonModalSave')

const modalInit = () => {
  if (event.target.nodeName === "BUTTON" && event.target.innerText === "Edit") {
    if (event.target.parentElement.parentElement.id === 'loginData') {
      //edit user info
      let elem = event.target.parentElement.getElementsByTagName('span')[1]
      modal.open(elem.innerText, elem.id, 'user')
    }
    if (true) {
      //edit task
    }
  }
}

const startUpdate = () => {
}
addClick(modalInit, 'loginData')