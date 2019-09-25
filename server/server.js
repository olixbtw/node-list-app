// const path = require('path');
// app.use('/', express.static(__dirname + '/../build'));

const express = require('express');
const app = express()

app.use('/', express.static('./../build'));


app.get('/', function (req, res) {
  // app.get('/red', function (req, res) {
  res.redirect('/api')
});

// app.use()
// app.all()

app.get('/api', (req, res) => { res.send('api') })



// app.use(loginCheck)                               // redirect to authentication if not logged
// // app.get('/api/list', getCompletedTasks)        // get all tasks, filter COMLETED
// // регаемся\логинимся
// app.post(createUser)                              // if we dont have a user - CAN create
// app.get(createToken)                              // if such user exists - log in (and remember)
// // if not - try again
// // redirect to the APP

// // when logged
// app.get('/api/users', getUser)                    // we have user and we need to initialize in a system
// app.get('/api/list', getTasksNew)                 // get all tasks, filter related to the user and give it back
// app.get('/api/list', getTasksCompleted)           // get all tasks, filter related to the user and give it back

// app.post('/api/list', createTask)
// app.put('/api/list', comleteTask)                  //update the task

app.listen(3000, () => { console.log('Server is on port 3000!') })