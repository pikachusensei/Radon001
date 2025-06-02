import cron from "cron";
import https from "https";

const job=new cron.CronJob("*/14 * * * *",function(){
    https
        .get(process.env.API_URL,(res)=>{
            if(res.statusCode===200){
                console.log("get request send successfully");
            }
            else{
                console.log("get request failed",res.statusCode);
            }
        })
        .on("error",(e)=>console.log("Error while swending get request",e));
});

export default job;