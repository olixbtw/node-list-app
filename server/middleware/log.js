module.exports = (req, response, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};