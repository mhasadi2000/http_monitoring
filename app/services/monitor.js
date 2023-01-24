const cron = require('node-cron');
const { axiosreq } = require('../utils/axios_request');

exports.schedul = async (pgInstance) =>{

  console.log("before starting");
    await cron.schedule('*/25 * * * * *',async function(pgInstance) {
        console.log('sending request to url...');

      });

};


exports.requestMonitor = async (pgInstance) =>{

  console.log("----------------------------------------------------------------------");
    const { rows: urlRows} = await pgInstance.query(
        "select * from urls;",
      );

      console.log("get urls");

    for (const url of urlRows) {
      console.log("*********");
        const responseStatusCode = await axiosreq(
            'GET',
            url.address,
            {
                "Content-Type": "application/json",
            }
        );

          console.log("axios req responseStatusCode",responseStatusCode);

        const { rowCount: requestCount } = await pgInstance.query(
            "insert into requests (url_id,result,created_at) " +
              "values ($1, $2,$3);",
            [url.id, parseInt(responseStatusCode), new Date()]
          );

        console.log("insert into request");

        if(parseInt(responseStatusCode) > 299 ){

          
          const { rowCount: urlCount } = await pgInstance.query(
            "update urls set failed_times = $1 where id = $2;",
            [url.failed_times + 1,url.id]
            
            );
            console.log("update url failed_times",urlCount);

            if(url.failed_times + 1 == url.threshold){
              console.log(`alert ${url.address}`);
              const { rowCount: alertCount } = await pgInstance.query(
                "insert into alerts (url_id,url_address,created_at) " +
                  "values ($1, $2,$3);",
                [url.id, url.address, new Date()]
              );
            }
        }


    }

};