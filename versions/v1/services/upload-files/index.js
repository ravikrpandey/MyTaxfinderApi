const multer = require('multer')
const Router = require("express").Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '/uploaded-local-files');
        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueFileName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueFileName);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1MB file size limit
    },
});

module.exports = {
    upload
};