const block = require('./draw.blocks')

const clearData = () => {
  block.info.innerHTML = ''
  block.list.innerHTML = ''
}

const generateInfo = (userData) => {
  return `
    username - ${userData['username']}<br>
    password - ${userData['password']}<br>
    id - ${userData['_id']}<br>
  `
}

const generateList = (userList) => {
  let listString = ''

  if (userList.length)
    userList.forEach(item => {
      listString += generateListItem(item)
    });
  else
    listString = `<li style="pointer-events:none;">No tasks available</li>`

  return listString
}

const generateListItem = (item) => {
  return `
    <li id="${item._id}" class="task-item ${item.completed ? 'done' : ''}">
    <button>Delete</button>
    ${item.text}
    <span class="date">${item.createdDate}</span>
    </li>  `
  // <button onclick='editTask("${item._id}")'>Edit</button>
}

module.exports = {
  clear: clearData,
  item: generateListItem,
  list: generateList,
  info: generateInfo
}