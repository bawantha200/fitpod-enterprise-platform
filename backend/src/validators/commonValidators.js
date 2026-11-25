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
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
];




const loginValidator = [
  validateEmail("email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];


const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Name must be between 2 and 150 characters"),
  validateEmail("email"),
  validatePassword("password"),
  body("userType")
    .optional()
    .isIn(["CUSTOMER", "STAFF"])
    .withMessage("User type must be CUSTOMER or STAFF"),
];

module.exports = {
  validateUUID,
  validateEmail,
  validatePassword,
  validatePagination,
  loginValidator,    
  registerValidator,
};