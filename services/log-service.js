'use strict';

const models = require('../models');
const moment = require('moment');

module.exports = {
  getLog: function() {
    return models.log.findAll({
        attributes: ['id', 'timeBegin', 'timeFinish', 'result', 'pcip'],
        order: 'timeBegin DESC',
        limit: 200,
        include: [
          { model: models.student },
          { model: models.lab }
        ]
      })
      .then((log) => {
        log.forEach((item) => {
          item.dataValues.timeBegin = moment(item.timeBegin).format('DD-MM-YYYY hh:mm');
          item.dataValues.timeFinish = moment(item.timeFinish).format('DD-MM-YYYY hh:mm');
        });

        return log;
      });
  }
};