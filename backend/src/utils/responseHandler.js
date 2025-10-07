// backend/utils/responseHandler.js

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code (default 200)
 * @param {String} message - Success message
 * @param {Object} [data={}] - Optional result data
 */
export const successResponse = (res, statusCode = 200, message = "Success", data = {}) => {
  return res.status(statusCode).json({
    statusCode,       // Added statusCode field
    status: "success",
    message,
    result: data,
  });
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code (default 500)
 * @param {String} message - Error message
 * @param {Object} [error={}] - Optional error details
 */
export const errorResponse = (res, statusCode = 500, message = "Server Error", error = {}) => {
  return res.status(statusCode).json({
    statusCode,       // Added statusCode field
    status: "error",
    message,
    error,
  });
};
