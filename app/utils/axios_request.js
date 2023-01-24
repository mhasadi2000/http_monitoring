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

  let status =null;

  const response = await axios(config)
    .then(function (response) {
      if (response.status === 201 || response.status === 200) {
        // result = response.data;
        console.log("url:", url);
        console.log("Response status code", response.status);
        status =  response.status;
      }
    })
    .catch((error) => {
      console.log("error:", error.response.statuas);
      console.log("ERROR status code:");
      status = error.response.status;
    });

    return status;
};