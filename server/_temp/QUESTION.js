
app.get('/', function (req, res) { })
app.get('/red', function (req, res) {
  res.redirect('/api')
});

app.get('/api', (req, res) => { res.send('api') })