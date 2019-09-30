
const jwt = require('jsonwebtoken');
const sugar = require("../config/_sugar.json").sugar;

module.exports = (req, res, next) => {

  if (req.headers.authorization) {
    req.user = jwt.verify(req.headers.authorization, sugar);
  }

  next();
};