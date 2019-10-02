let mongoose = require('mongoose');

let listSchema = {
  text: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
    // type: mongoose.types.ObjectId,
    // type: Schema.types.ObjectId,
    // type: ObjectId,
    // ref: 'users'
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
};

let List = mongoose.model('List', listSchema);


module.exports.getTasks = (filter) => List.find(filter).exec();
module.exports.getTask = (id) => List.findById(id).exec();
// module.exports.getUserTasks = (filter) => List.find({ userId: filter }).exec();

module.exports.removeTask = (id) => List.findById(id).deleteMany().exec();
module.exports.removeAllTasks = (filter) => List.find(filter).deleteMany().exec();
module.exports.removeUsersTasks = (filter) => List.find(filter).deleteMany().exec();

module.exports.updateCompleted = (filter, completedValue) => List.updateMany(filter, { completed: completedValue });

module.exports.addTask = (text, userId) => new List({
  text: text,
  userId: userId
}).save()