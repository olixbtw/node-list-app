const block = require('./draw.blocks')

const clearData = () => {
  block.info.innerHTML = ''
  block.list.innerHTML = ''
  block.counter.innerHTML = ''
  block.loginPrompt.innerHTML = ''
}

const generateInfo = (userData) => {
  return `
    <li><button class="small">Edit</button><span>username:</span><span class="data" id="username">${userData['username']}</span></li>
    <li><button class="small">Edit</button><span>password:</span><span class="data" id="password">${userData['password']}</span></li>
    <li>                                   <span>id:</span><span class="data" id="userInfo_id">${userData['_id']}</span></li>
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
      <div>${item.text}</div>
      <span class="date">${item.createdDate}</span>
    </li>  
  `
}

module.exports = {
  clear: clearData,
  item: generateListItem,
  list: generateList,
  info: generateInfo
}