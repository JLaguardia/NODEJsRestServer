'use strict';
module.exports = function(app){
  var fileList = require('../controllers/fileController');

  app.route('/files')
    .get(fileList.listAllFiles)
    .post(fileList.createFile);

  app.route('/files/:fileId')
    .get(fileList.readFile)
    .put(fileList.updateFile)
    .delete(fileList.deleteFile);
};
