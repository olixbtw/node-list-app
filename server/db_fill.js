const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/node_list', { useNewUrlParser: true, useUnifiedTopology: true })

const user = mongoose.model('User', { name: String, pass: String }, 'users')
const task = mongoose.model('Task', { name: String, pass: String }, 'tasks')
// mongoose.model('question', new Schema({ url: String, text: String, id: Number }));


let users = [];
users.push(new user({ name: "alex", pass:'123' }))
users.push(new user({ name: "paul", pass:'qwe' }))
users.push(new user({ name: "sass", pass:'zxc' }))

users.forEach(user=>{user.save()})

















// const usr = new user({ name: "alex", pass:'123' })
// kitty.save().then(() => console.log('meow'))
// user({ name: "alex", pass:'123' }).save()




//

const users = mongoose.model('name', {}, 'users')

users.find()
    .then(data => { console.log(data) })


    // users.








// console.log(__dirname)
// console.log(__filename)
