const { default: fastify } = require("fastify");
const userController = require("../controllers/users");

const {
  verifyOTPDataSchema,
  verifyOTPResponse,
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
    onRequest: [fastify.authenticate],
    handler: userController.addUserinfo(fastify),
  };
};

const addUrlOpts = (fastify) => {
  return {
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
  
  //delete url
  // fastify.delete("/api/urls/:urlID", );

  //get url alerts
  fastify.get("/api/alerts", );

  //dismis url alerts
  // fastify.put("/api/alerts/:urlID", );

  done();
}

module.exports = userRoutes;
