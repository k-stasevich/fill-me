module.exports = function(app) {
  require('./course')(app);
  require('./lab')(app);
};