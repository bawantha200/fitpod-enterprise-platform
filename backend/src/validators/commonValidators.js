const { body, param, query } = require("express-validator");

const validateUUID = (fieldName = "id") => {
  return param(fieldName)
    .isUUID()
    .withMessage(`${fieldName} must be a valid UUID`);
};

const validateEmail = (fieldName = "email") => {
  return body(fieldName)
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail();
};

const validatePassword = (fieldName = "password") => {
  return body(fieldName)
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters");
};

const validatePagination = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

module.exports = {
  validateUUID,
  validateEmail,
  validatePassword,
  validatePagination,
};