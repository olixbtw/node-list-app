const express = require('express')

//initialize app
let serverConfig = require('./config/server');
const app = express();

//connect db
require('./database/initialize');

// middleware
const logger = require('./middleware/log')
app.use(logger)

// routes
let usersRoutes = require('./routes/users');
app.use('/api', usersRoutes);


app.listen(serverConfig.port);