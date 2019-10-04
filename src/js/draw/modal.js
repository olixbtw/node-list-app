const User = require('./../user/user')
const Task = require('./../task/task')

let editableId = ''
let edtiableType = ''

const modalInit = () => {
  if (event.target.nodeName === "BUTTON" && event.target.innerText === "Edit") {
    event.stopImmediatePropagation()
    if (event.target.parentElement.parentElement.id === 'loginData') {
      //edit user info
      let elem = event.target.parentElement.getElementsByTagName('span')[1]
      modal.open(elem.innerText, elem.id, 'user')
    }
    if (event.target.parentElement.nodeName === "LI") {
      let elem = event.target.parentElement
      modal.open(elem.getElementsByTagName('div')[0].innerText, elem.id, 'task')
    }
  }
}

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
      User.update(editableId, newValue)
      break
    case 'task':
      Task.update(editableId, newValue)
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
  save: modalSave,
  init: modalInit
}