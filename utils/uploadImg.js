var multer = require('multer');
var path = require('path');
var fs = require('fs');

// Storage config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = 'uploads/';
        fs.mkdirSync(folder, { recursive: true }); // auto-create if not exists
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // keep extension
    }
});

// File filter (only images)
function fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
}

var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // max 2MB
});

module.exports = upload;