const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test_db', { useNewUrlParser: true, useUnifiedTopology: true })

const Cat = mongoose.model('Cow', { name: String }, 'cow_db')
// mongoose.model('question', new Schema({ url: String, text: String, id: Number }));


const kitty = new Cat({ name: "Zildjian" })
kitty.save().then(() => console.log('meow'))




//

const users = mongoose.model('name', {}, 'users')

users.find()
    .then(data => { console.log(data) })


    // users.








// console.log(__dirname)
// console.log(__filename)
