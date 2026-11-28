const successResponse = (res, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message, statusCode = 400, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

// backend/src/utils/apiResponse.js
const apiResponse = (success, message, data = null) => ({
  success,
  message,
  data,
});



module.exports = {
  successResponse,
  errorResponse,
  apiResponse,
};