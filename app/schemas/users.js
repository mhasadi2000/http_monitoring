

const verifyOTPDataSchema = {
  type: "object",
  properties: {
    username:{type:'string'},
    password: {
      type: "string",
    },
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



module.exports = {
  verifyOTPDataSchema,

  verifyOTPResponse,
};
