const express = require('express')
const cors = require('cors');

//initialize app
let serverConfig = require('./config/server')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());

//connect db
require('./database/initialize')

// middleware
const logger = require('./middleware/log')
app.use(logger)

const authenticator = require('./middleware/auth')
app.use(authenticator)

// routes

let usersRoutes = require('./routes/users')
app.use('/api', usersRoutes);
let listRoutes = require('./routes/tasks')
app.use('/api', listRoutes);
let loginRoutes = require('./routes/login')
app.use('/api', loginRoutes);

app.use('/', express.static('./build'))

app.listen(serverConfig.port, () => { console.log(`Server runs on ${serverConfig.port}`) })