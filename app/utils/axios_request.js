const { RequestValidationError, NotAvailableError, BadRequestError} = require("../errors");
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

  const response = await axios(config)
    .then(function (response) {
      if (response.status === 201 || response.status === 200) {
        // result = response.data;
        console.log("url:", url);
        console.log("Response status code", response.status);
        return response.status;
      }
    })
    .catch((error) => {
      console.log("url:", url);
      console.log("ERROR status code:");
      console.log(error.response.status);
      return error.response.status;
    });
};