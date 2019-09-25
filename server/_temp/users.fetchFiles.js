const fs = require('fs')

let content;
fs.readFile('test.txt', (err, data) => {
  if (err) throw err;
  content = data.toString().replace(/\d/g, '_');

  fs.writeFileSync('test.parsed.txt', content)
  fs.writeFileSync('test.parsed.copy.txt', content)
  fs.appendFile('test.parsed.txt', '\n\nAdded 1 more line. Ha-ha!', () => { })
  fs.appendFile('test.parsed.copy.txt', '\n\nAdded 2 more lines. \nHa-ha!', () => {
    fs.unlink('test.parsed.copy.txt', () => { })
  })
})

console.log(
  fs.readdirSync(__dirname)
)


// let users = [
//   { name: "Alex", id: 1 },
//   { name: "Oleg", id: 2 },
//   { name: "Vika", id: 3 },
//   { name: "Tolik", id: 4 },
// ]

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:code', (req, res) => {
  res.json(users.filter(user => user.id === parseInt(req.params.code)))
})

app.post('/api/users/new/:code/:name', (req, res) => {
  users.push({ name: req.params.name, id: parseInt(req.params.code) })
  console.log(users)
  res.send()
})

app.delete('/api/users/:code', (req, res) => {
  users = users.filter(user => user.id !== parseInt(req.params.code))
  console.log(users)
  res.send()
})
