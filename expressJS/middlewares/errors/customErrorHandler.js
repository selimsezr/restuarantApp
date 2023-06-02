const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if (err.name === 'SyntaxError') {
        customError = new CustomError("Unexpected syntax error", 400);
    }
    if (err.name === 'validationError') {
        customError = new CustomError(err.message, 400);
    }
    if(err.code === 11000) {
        //Duplicate error
        customError = new CustomError("Duplicate key found: Check your Input", 400);
    }
    if(err.name === "CastError") {
        customError = new CustomError("Please provide a valid id", 400)
    }
    res
    .status(customError.status || 500)
    .json({
        success: false,
        message: customError.message 
    });
};

module.exports = customErrorHandler;