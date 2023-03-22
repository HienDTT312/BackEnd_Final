
const multer = require('multer');
const logger = require('../services/loggerService');

const DIR = './public/img';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.floor(new Date().getTime() / 1000)
        + '-' + fileName)
    }
});

const uploadAvatar = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            logger.erro('Only .png, .jpg and .jpeg format allowed!');
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


const DIRFILE = './public/documents';
const storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIRFILE);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.floor(new Date().getTime() / 1000)
        + '-' + fileName)
    }
});

const uploadDocument = multer({
    storage: storageFile,
    fileFilter: (req, file, cb) => {
        if (file.mimetype) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = {
    uploadAvatar, 
    uploadDocument,
}   