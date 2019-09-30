const clearData = () => {
  document.getElementById('loginStatus').innerHTML = ''
  document.getElementById('task_list').innerHTML = ''
}

const drawInfo = (userData) => {
  document.getElementById('loginStatus').innerHTML += 'username  - ' + userData[username] + '<br>'
  document.getElementById('loginStatus').innerHTML += 'password  - ' + userData[password] + '<br>'
  document.getElementById('loginStatus').innerHTML += 'id  - ' + userData[_id] + '<br>'
  document.getElementById('loginStatus').innerHTML += userTasks
}

const drawList = (userList) => {
  document.getElementById('task_list').innerHTML += '<ul>'
  for (item in userList)
    document.getElementById('task_list').innerHTML += `<li ${item.completed ? 'class=done' : ''}>${item.text}<button onclick='deleteItem(${item._id})'>Delete</button><span>${item.date}</span></li>`
  document.getElementById('task_list').innerHTML += '</ul>'
}

const drawData = {
  clear: clearData,
  list: drawList,
  info: drawInfo,
}


const dispalyData = (data, list) => {
  drawData.clear()
  drawData.info(data)
  drawData.list(list)
}