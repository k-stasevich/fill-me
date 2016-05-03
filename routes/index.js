module.exports = function(app) {
  require('./course')(app);
  require('./lab')(app);
  require('./student')(app);
  require('./log')(app);
  require('./question')(app);
};