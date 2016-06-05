'use strict';

const models = require('../models');
const moment = require('moment');

module.exports = {
  getLog: function(date, student) {
    let options = {
      attributes: ['id', 'timeBegin', 'timeFinish', 'result', 'pcip'],
      order: 'timeBegin DESC',
      limit: 200,
      where: { timeBegin: { $between: [moment(date).startOf('day').toDate(), moment(date).endOf('day').toDate()] } },
      include: [
        { model: models.student },
        { model: models.lab }
      ]
    };

    if (student) {
      options.include[0].where = {
        fio: { $like: '%' + student + '%' }
      };
    }

    return models.log.findAll(options)
      .then((log) => {
        log.forEach((item) => {
          item.dataValues.result = item.dataValues.result === '1' ? 'Зачтено' : 'Не зачтено';
          item.dataValues.timeBegin = moment(item.timeBegin).format('DD-MM-YYYY hh:mm');
          item.dataValues.timeFinish = moment(item.timeFinish).format('DD-MM-YYYY hh:mm');
        });

        return log;
      });
  }
};