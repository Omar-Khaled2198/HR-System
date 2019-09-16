const { body, header } = require("express-validator");

const RequestVacation = [
    body("title")
    .exists()
    .not().isEmpty()
    .isString(),
    body("description")
    .exists()
    .isString(),
    body("from")
    .exists()
    .not().isEmpty()
    .isString(),
    body("to")
    .exists()
    .not().isEmpty()
    .isString()
];

module.exports = { RequestVacation };