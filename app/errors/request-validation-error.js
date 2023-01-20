const { CustomError } = require('./custom-error');

class RequestValidationError extends CustomError {
  statusCode = 400;
  errors = [];

  constructor(error) {
    super('Invalid request parameter');
    this.error = error;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const errors = this.error.map((err) => {
      const field = err.instancePath.split('/')[1];
      const message = err.message;

      return { field, message };
    });

    return errors;
  }
}

module.exports = { RequestValidationError };
