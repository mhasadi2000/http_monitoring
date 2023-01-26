const { default: fastify } = require("fastify");
const userController = require("../controllers/users");

const {
  verifyOTPDataSchema,
  verifyOTPResponse,
  signupResponse,
  urlDataSchema,
  addUrlResponse,
} = require("../schemas/users");

const verifyOTPOpts = (fastify) => {
  return {
    schema: {
      body: verifyOTPDataSchema,
      response: {
        200: verifyOTPResponse,
      },
    },
    handler: userController.verifyOTP(fastify),
  };
};


const addUserOpts = (fastify) => {
  return {
    schema: {
      body: verifyOTPDataSchema,
      response: {
        200: signupResponse,
      },
    },
    handler: userController.addUserinfo(fastify),
  };
};

const addUrlOpts = (fastify) => {
  return {
    schema: {
      body: urlDataSchema,
      response: {
        200: addUrlResponse,
      },
    },
    onRequest: [fastify.authenticate],
    handler: userController.addUrlinfo(fastify),
  };
};

const getUrlOpts = (fastify) => {
  return {
    onRequest: [fastify.authenticate],
    handler: userController.getUrlsinfo(fastify),
  };
};

const getUrlStatsOpts = (fastify) => {
  return {
    onRequest: [fastify.authenticate],
    handler: userController.getUrlsStatsinfo(fastify),
  };
};

const getAlertsOpts = (fastify) => {
  return {
    onRequest: [fastify.authenticate],
    handler: userController.getAlertsinfo(fastify),
  };
};


function userRoutes(fastify, options, done) {

  // login
  fastify.post("/api/users/login", verifyOTPOpts(fastify));
  //sign up
  fastify.post("/api/users", addUserOpts(fastify));

  //create url
  fastify.post("/api/urls",addUrlOpts(fastify) );

  //get users urls
  fastify.get("/api/urls",getUrlOpts(fastify) );
  
  //get specific url stat
  fastify.get("/api/urls/:urlID",getUrlStatsOpts(fastify) );

  //get url alerts
  fastify.get("/api/alerts", getAlertsOpts(fastify));


  done();
}

module.exports = userRoutes;
