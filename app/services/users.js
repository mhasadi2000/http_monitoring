// const { generateOTP } = require("../utils/otp");
// const { sendSmsAsanak } = require("../utils/sms");
const {
  NotAvailableError,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../errors");

exports.verify = async (jwt, pgInstance, data) => {
  // get user
  const { rows } = await pgInstance.query(
    "select * from users where username = $1 and password = $2;",
    [data.username, data.password]
  );

  let token;
  if (rows[0]) {
    const user = rows[0];
    // create jwt
    token = jwt.sign({
      user_id: user.id,
    });
  } else {
    throw new BadRequestError("Wrong username or password");
  }

  // return jwt
  return {
    data: {
      access_token: token,
    },
  };
};

exports.addUser = async (pgInstance, data) => {

  const { rows } = await pgInstance.query(
    "select * from users where username = $1 and password = $2;",
    [data.username, data.password]
  );

  if (rows[0]){
    throw new BadRequestError(`${data.username} has already an acount.`);
  }

  const date= new Date();
  const { rowCount: userCount } = await pgInstance.query(
    "insert into users (username,password,created_at) " +
      "values ($1, $2,$3);",
    [data.username, data.password, date]
  );

  
  const { rows: userRows} = await pgInstance.query(
    "select id from users where username = $1 and password = $2;",
    [data.username, data.password]
  );

  const userid = userRows[0].id;

  return{
    data:{
        userID: userid
    }
  };
  
};

exports.addUrl = async (pgInstance, data,user_id) => {

  const date= new Date();
  const { rowCount: userCount } = await pgInstance.query(
    "insert into urls (address,threshold,user_id,created_at) " +
      "values ($1, $2,$3,$4);",
    [data.address, data.threshold, user_id, date]
  );

  
  const { rows: urlRows} = await pgInstance.query(
    "select id from urls where address = $1 and threshold = $2;",
    [data.address, data.treshold]
  );

  const urlid = urlRows[0].id;

  return{
    data:{
        urlID: urlid
    }
  };
  
};

exports.getUrl = async (pgInstance,user_id) => {

  const { rows: urlRows} = await pgInstance.query(
    "select * from urls where user_id = $1;",
    [user_id]
  );

  return{
    data:[...urlRows]
  };
  
};

exports.getUrlStats = async (pgInstance,params,query,user_id) => {

  const {urlID} = params;
  const {from_time,to_time} = query;
  const from_time_date = new Date(from_time); 
  const to_time_date = new Date(to_time); 

  const { rows: requestRows} = await pgInstance.query(
    "select * from requests where url_id = $1 and created_at between $2 and $3;",
    [urlID,from_time_date,to_time_date]
  );

  return{
    data:[...requestRows]
  };
  
};


exports.getalerts = async (pgInstance,user_id) => {

  const { rows: urlRows} = await pgInstance.query(
    "select * from urls where user_id = $1;",
    [user_id]
  );

  let result =[];
  for (const url of urlRows) {

    const { rows: requestRows} = await pgInstance.query(
      "select * from requests where url_id = $1;",
      [url.id]
      );

    result.push(...requestRows)
  }

  return{
    data:[...result]
  };
  
};



