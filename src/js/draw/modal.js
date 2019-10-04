const User = require('./../user/user')
const Task = require('./../task/task')

let editableId = ''
let edtiableType = ''

const modalOpen = (content, id, type) => {
  editableId = id;
  edtiableType = type;

  let modalWindow = document.getElementById('ModalWindow')
  modalWindow.classList.add('active')
  modalWindow.getElementsByClassName('modalText')[0].innerHTML = `Edit ${type}`
  modalWindow.getElementsByTagName('textarea')[0].value = content
}

const modalClose = () => {
  //reset modal
  document.getElementById('ModalWindow').classList.remove('active')
  document.getElementsByClassName('modalText')[0].innerHTML = ''
}

const modalSave = () => {
  let newValue = document.getElementById('ModalWindow').getElementsByTagName('textarea')[0].value

  switch (edtiableType) {
    case 'user':
      User.updateUser(editableId, newValue)
      break
    case 'task':
      Task.updateTask(editableId, newValue)
      break
    default:
      console.error('other type')
      break
  }

  modalClose()
}


module.exports = {
  open: modalOpen,
  close: modalClose,
  save: modalSave
}