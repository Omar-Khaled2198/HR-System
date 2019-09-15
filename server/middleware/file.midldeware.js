var multer = require('multer');
var path = require("path")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.dirname(__dirname)+'/public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, req.accountId+path.extname(file.originalname))
    }
});

var Upload = multer({storage: storage});

module.exports = Upload;