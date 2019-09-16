const { body, header } = require("express-validator");

const CreateProfile = [
    body("first_name")
    .exists()
    .not().isEmpty()
    .isString(),
    body("last_name")
    .exists()
    .not().isEmpty()
    .isString(),
    body("job_title")
    .exists()
    .not().isEmpty()
    .isString()
];

module.exports = { CreateProfile };