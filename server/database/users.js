let mongoose = require('mongoose');

let userSchema = {
  username: String,
  password: String
};

let User = mongoose.model('User', userSchema);


module.exports.getUsers = (filter) => User.find(filter).exec();

module.exports.getUserById = (id) => User.findById(id).exec();

module.exports.addUser = (name, pass) => new User({
  username: name,
  password: pass
}).save()
