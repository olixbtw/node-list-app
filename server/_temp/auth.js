const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const sugar = 'abc';

app.use('/', express.static('./'));
app.use(express.json());

const users = [
  {
    id: 1,
    name: 'Alex',
    username: 'qwe',
    password: '123'
  },
  {
    id: 21,
    name: 'Hannah',
    username: 'anN',
    password: '456a'
  },
  {
    id: 89,
    name: 'Mykola',
    username: 'MuKoJla',
    password: 'cannon'
  }
];

app.post('/token', (req, res) => {
  console.log('GET token');
  let authenticated = users.find(user => {
    return user.username === req.body.username && user.password === req.body.password;
  });

  if (authenticated) {
    const token = jwt.sign(authenticated, sugar);
    res.json(token);
  } else
    res.send('You\'re not authenticated');
});

app.get('/shared', (req, res) => {
  console.log('GET Shared');
  res.send(JSON.stringify('You\'ve received shared data'));
});

app.use((req, res, next) => {
  const decoded = jwt.verify(req.headers.authorization, sugar);
  req.user = decoded;
  console.log('AUTHORIZATION - ' + req.headers.authorization);
  console.log(decoded);
  next();
});

app.get('/protected', (req, res) => {
  console.log('GET protected')
  if (req.user) {
    res.send(JSON.stringify(req.user));
  }
});

app.listen(3000, () => { console.log('Server is on port 3000!'); });