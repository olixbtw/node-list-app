let userDataBlock = document.getElementById('loginData');
let taskListBlock = document.getElementById('task_list');

const clearData = () => {
  userDataBlock.innerHTML = ''
  taskListBlock.innerHTML = ''
}

const drawInfo = (userData) => {
  userDataBlock.innerHTML += 'username  - ' + userData['username'] + '<br>'
  userDataBlock.innerHTML += 'password  - ' + userData['password'] + '<br>'
  userDataBlock.innerHTML += 'id  - ' + userData['_id'] + '<br>'
}

const drawList = (userList) => {
  let listString = ''

  if (userList.length)
    userList.forEach(item => {
      listString += drawListItem(item)
    });
  else
    listString = `<li>No tasks available</li>`

  taskListBlock.innerHTML = listString
}

const drawListItem = (item) => {
  return `
    <li id="${item._id}" ${item.completed ? 'class=done' : ''} onclick='toggleComplete("${item._id}")'>
    <button onclick='deleteTask("${item._id}")'>Delete</button>
    ${item.text}
    <span class="date">${item.createdDate}</span>
    </li>  `
    // <button onclick='editTask("${item._id}")'>Edit</button>
}

const updateCounter = () => {
  document.getElementById('taskCounter').innerHTML = 'Total number of notes - ' + currentUser.tasks.length
}