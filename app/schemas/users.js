

const verifyOTPDataSchema = {
  type: "object",
  properties: {
    username:{type:'string'},
    password: {
      type: "string",
    },
  },
};

const urlDataSchema = {
  type: "object",
  properties: {
    address:{type:'string'},
    method: {
      type: "string",
    },
    threshold: {type: "string"}
  },
};

// responses

const verifyOTPResponse = {
  type: "object",
  properties: {
    data: {
      access_token: {
        type: "string",
      },
    },
  },
};

const signupResponse = {
  type: "object",
  properties: {
    data: {
      userID: {
        type: "integer",
      },
    },
  },
};

const addUrlResponse = {
  type: "object",
  properties: {
    data: {
      urlID: {
        type: "integer",
      },
    },
  },
};



module.exports = {
  verifyOTPDataSchema,

  verifyOTPResponse,
  signupResponse,
  urlDataSchema,
  addUrlResponse,
};
