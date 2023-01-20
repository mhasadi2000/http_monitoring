const { OutServerError, RequestValidationError, NotAvailableError, BadRequestError} = require("../errors");
const {Axios, AxiosError} = require("axios");
const {CustomError} = require("../errors/custom-error");

const axios = require("axios").default;

module.exports.axiosreq = async (method, url, headers, body) => {
  var config = {
    method: method,
    url: url,
    headers: headers,
    data: body,
  };
  let result;

  const response = await axios(config)
    .then(function (response) {
      if (response.status === 201 || response.status === 200) {
        result = response.data;
        console.log("response", response.data);
      }
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);

      if(error instanceof AxiosError)
        throw new BadRequestError(error.response.data.message)
      if (error.response.status === 500 || error.response.status === 502) {
        throw new OutServerError();
      }

      if (error.response.status === 400) {
        throw new RequestValidationError();
      } else if (error.request) {
        console.log(error.message);
        throw new NotAvailableError();
      } else {
        console.log(error.message);
        throw new NotAvailableError();
      }
    });

  return result;
};