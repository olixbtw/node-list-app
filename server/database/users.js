let mongoose = require('mongoose');

let userSchema = {
  username: { type: String, required: true },
  password: { type: String, required: true }
};

let User = mongoose.model('User', userSchema, 'users');


module.exports.getUsers = (filter) => User.find(filter).exec();
module.exports.getUserById = (id) => User.findById(id).exec();

module.exports.removeAllUsers = (filter) => User.find(filter).deleteMany().exec();
module.exports.removeUser = (id) => User.findById(id).deleteOne().exec();

module.exports.updateUser = (filter, update) => User.updateMany(filter, update);

module.exports.addUser = (name, pass) => new User({
  username: name,
  password: pass
}).save()
