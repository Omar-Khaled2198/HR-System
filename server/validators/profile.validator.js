const { body, header } = require("express-validator");

const CreateProfile = [
    body("first_name")
    .exists()
    .isString(),
    body("last_name")
    .exists()
    .isString(),
    body("job_title")
    .exists()
    .isString()
];

module.exports = { CreateProfile };