const userDataProperties = {
  id: { type: "integer" },
  mobile: { type: "string", maxLength: 11 },
  first_name: { type: "string" },
  last_name: { type: "string" },
};

const username = {
  type: "string",
};
const userDataResponse = {
  type: "object",
  properties: {
    data: {
      username,
      ...userDataProperties,
    },
  },
};

const userDataSchema = {
  type: "object",
  properties: userDataProperties,
};

const nationalCodeParamSchema = {
  type: "object",
  properties: {
    username,
  },
};

const userIdParamSchema = {
  type: "object",
  properties: {
    userId: {
      type: "integer",
    },
  },
};

const verifyOTPDataSchema = {
  type: "object",
  properties: {
    username,
    password: {
      type: "string",
    },
  },
};

const addUserDataSchema = {
  type: "object",
  properties: {
    first_name: userDataProperties.first_name,
    last_name: userDataProperties.last_name,
    mobile: userDataProperties.mobile,
    username:{type: "string"},
    password:{type: "string"},
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
  userDataSchema,
  nationalCodeParamSchema,
  userIdParamSchema,
  verifyOTPDataSchema,

  verifyOTPResponse,
  getMeResponse,
  userDataResponse,
  addUserDataSchema,
  deleteUserDataSchema,
};
