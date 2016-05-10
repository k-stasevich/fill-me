'use strict';

const multipartMiddleware = require('connect-multiparty')();
const multiparty = require('multiparty');
const fs = require('fs');

module.exports = function(app) {
  app.post('/', multipartMiddleware, uploadFiles);
};

function uploadFiles(req, res) {

  fs.readFile(req.files.file.path, function(err, data) {
    if (err) {
      return res.status(500).json({ message: 'CANNOT READ FILE' });
    }

    fs.writeFile('temp-files/' + req.files.file.originalFilename, data, 'binary', function(err) {
      if (err) {
        return res.status(500).json({ message: 'CANNOT WRITE FILE' });
      }

      res.send({ success: true });
    })
  });
}