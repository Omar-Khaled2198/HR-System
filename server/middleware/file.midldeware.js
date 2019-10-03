var multer = require('multer');
var path = require("path")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.dirname(__dirname)+'/public/profile_pictures/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, req.params.account_id+path.extname(file.originalname))
    }
});

var Upload = multer({storage: storage});

module.exports = Upload;