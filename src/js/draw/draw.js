const block = require('./draw.blocks')

const clearData = () => {
  block.info.innerHTML = ''
  block.list.innerHTML = ''
  block.counter.innerHTML = ''
  block.loginPrompt.innerHTML = ''
}

const generateInfo = (userData) => {
  return `
    <div><button class="small">Edit</button><span>username</span> - <span id="username">${userData['username']}</span></div>
    <div><button class="small">Edit</button><span>password</span> - <span id="password">${userData['password']}</span></div>
    <div>                                   <span>id</span>       - <span id="userInfo_id">${userData['_id']}</span></div>
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
    <button class="small edit">Edit</button>
    <button class="small">Delete</button>
    ${item.text}
    <span class="date">${item.createdDate}</span>
    </li>  `
}

module.exports = {
  clear: clearData,
  item: generateListItem,
  list: generateList,
  info: generateInfo
}