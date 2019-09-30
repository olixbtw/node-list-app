const clearData = () => {
  console.log('clearData')
  document.getElementById('loginData').innerHTML = ''
  document.getElementById('task_list').innerHTML = ''
}

const drawInfo = (userData) => {
  document.getElementById('loginData').innerHTML += 'username  - ' + userData['username'] + '<br>'
  document.getElementById('loginData').innerHTML += 'password  - ' + userData['password'] + '<br>'
  document.getElementById('loginData').innerHTML += 'id  - ' + userData['_id'] + '<br>'
}

const drawList = (userList) => {

  let listString = ''
  userList.forEach(item => {
    console.log(item)
    listString += `
      <li ${item.completed ? 'class=done' : ''} onclick='completeItem("${item._id}")'>
      <button onclick='deleteItem("${item._id}")'>Delete</button>
      ${item.text}
      <span class="date">${item.createdDate}</span>
    </li>
    `
  });

  document.getElementById('task_list').innerHTML = listString
}

const dispalyData = (data, list) => {
  clearData()
  drawInfo(data)
  drawList(list)
}