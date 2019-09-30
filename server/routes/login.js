let express = require('express');
let router = express.Router();

let Users = require('../database/users');

const jwt = require('jsonwebtoken');
const sugar = require("../config/_sugar.json").sugar;

router.get('/login', (req, res) => {
  Users.getUsers()
    .then(users => {

      let authenticated = users.find(user => {
        return user.username === req.query.username && user.password === req.query.password;
      });

      if (authenticated) {
        // console.log(authenticated);
        const token = jwt.sign(authenticated.toJSON(), sugar);
        res.json(token);
      } else
        res.json('You\'re not authenticated');

    })
    .catch(err => console.log(err))
})

module.exports = router;