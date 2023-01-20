const cron = require('node-cron');
const fs = require('fs');
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
        const getResponseInfo = await axiosreq(
            url.method,
            url.address,
            {
                "Content-Type": "application/json",
            }
        );
        
    }

};