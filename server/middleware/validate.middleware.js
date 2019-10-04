const { validationResult } = require('express-validator');

const Validate = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var msg = "";
        const errors_list = errors.array();
        for(var i=0;i<errors_list.length;i++){
            msg+=errors_list[i].msg;
            if(i<errors_list.length-1)
                msg+=" and ";
            
        }
        return res.status(422).json({ msg });
    }
    next();
};

module.exports = Validate;