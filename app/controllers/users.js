const { verify, addUser, addUrl, getUrl, getUrlStats } = require("../services/users");

exports.verifyOTP = (fastify) => {
  return (req, reply) => {
    return verify(fastify.jwt, fastify.pg, req.body);
  };
};

exports.addUserinfo = (fastify) => {
  return (req, reply) => {
    return addUser(fastify.pg,req.body);
  };
};

exports.addUrlinfo = (fastify) => {
  return (req, reply) => {
    return addUrl(fastify.pg,req.body, req.user.user_id);
  };
};

exports.getUrlsinfo = (fastify) => {
  return (req, reply) => {
    return getUrl(fastify.pg, req.user.user_id);
  };
};

exports.getUrlsStatsinfo = (fastify) => {
  return (req, reply) => {
    return getUrlStats(fastify.pg, req.params,req.query,req.user.user_id);
  };
};

