var colors = require('colors');

colors.setTheme({
  get: 'green',
  post: 'blue',
  put: 'yellow',
  delete: 'red',
  default: 'white'
});


module.exports = (req, response, next) => {

  switch (req.method) {
    case "GET":
      console.log(`${req.method}`.get + ` ${req.url}`.default);
      break;
    case "POST":
      console.log(`${req.method}`.post + ` ${req.url}`.default);
      break;
    case "PUT":
      console.log(`${req.method}`.put + ` ${req.url}`.default);
      break;
    case "DELETE":
      console.log(`${req.method}`.delete + ` ${req.url}`.default);
      break;

    default:
      console.log(`${req.method} ${req.url}`.default);
      break;
  }

  next();
};