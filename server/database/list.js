let mongoose = require('mongoose');

let listSchema = {
  username: String,
  password: String
};

let List = mongoose.model('List', listSchema);