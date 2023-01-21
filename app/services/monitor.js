const cron = require('node-cron');
const { axiosreq } = require('../utils/axios_request');

exports.schedul = async (pgInstance) =>{

    cron.schedule('* 1 * * *', function() {
        console.log('sending request to url...');
        requestMonitor(pgInstance);

      });

};


const requestMonitor = async (pgInstance) =>{
    const { rows: urlRows} = await pgInstance.query(
        "select * from urls;",
      );


    for (const url of urlRows) {
        const responseStatusCode = await axiosreq(
            url.method,
            url.address,
            {
                "Content-Type": "application/json",
            }
        );



        const { rowCount: requestCount } = await pgInstance.query(
            "insert into requests (url_id,result,created_at) " +
              "values ($1, $2,$3);",
            [url.address, responseStatusCode, new Date()]
          );

        const { rowCount: urlCount } = await pgInstance.query(
            "update urls set failed_times = $1 where id = $2;",
            [url.failed_times + 1,url.id]
          
        );

    }

};