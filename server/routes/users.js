let express = require('express');
let router = express.Router();

let Users = require('../database/user');
let { statuses, httpStatuses } = require('../config/constants');

router.get('/users', (request, response) => {
    Users.getUsers()
        .then(users => { response.json({ status: statuses.success, users }) })
        .catch(err => { response.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, users: {}, error_text: err.message }) });
});

router.get('/users/:id', (request, response) => {
    Users.getUserById(request.params.id)
        .then(user => { response.json({ status: statuses.success, user }) })
        .catch(err => { response.status(httpStatuses.SERVER_ERROR).json({ status: statuses.failure, user: {}, error_text: err.message }) });
});

module.exports = router;