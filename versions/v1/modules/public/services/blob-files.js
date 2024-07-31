const { upload } = require("../../../services/upload-files");
const { saveFileAndGetName, getFileUri } = require('../../../services/upload-files/service')
const Router = require("express").Router();

Router.put('/save-file-get-url', upload.single('file'), saveFileAndGetName);

Router.get('/get-file-uri/:fileName', getFileUri);

module.exports = Router;