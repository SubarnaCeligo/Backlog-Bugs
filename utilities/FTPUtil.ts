import { decrypt } from "./stringUtil";
const path = require("path");
import AWS from "aws-sdk";
import Files from "files.com/lib/Files";
import dotenv from "dotenv";
Files.setBaseUrl("https://celigo.files.com");
/* eslint-disable */

export async function fetchEnv() {
  try {
    const s3 = new AWS.S3({
      accessKeyId: decrypt(process.env.AWS_ACCESS_KEY).toString(),
      secretAccessKey: decrypt(process.env.AWS_SECRET_KEY).toString(),
      region: "us-east-1"
    });
    const params = {
      Bucket: `automationcreds`,
      Key: `${process.env.ENV.toUpperCase()}.json`
    };
    const file = await s3.getObject(params).promise();
    const fileContent = file.Body.toString("utf-8");
    //console.log("fileContent", fileContent);
    //fs.writeFileSync("./env/.env", fileContent);
    return fileContent;
  } catch (e) {
    console.log("Unable to read file from S3 ", e);
  }
}

export async function createObject(ls) {
  try {
    for (const key in ls) {
      //console.log("key", key, typeof ls[key], ls[key]);
      if (typeof ls[key] === "object") {
        await this.createObject(JSON.parse(ls[key]));
      } else {
        process.env[key] = ls[key];
      }
    }
  } catch (e) {
    console.log("Unable to load data to Node process ", e);
  }
}

export async function getDataFromNodeProcess() {
  if (process.env["ENV"] === "dev") {
    let envPath = path.join(__dirname, "../env" + "/.env." + process.env["ENV"]);
    dotenv.config({ path: envPath });
  } else {
    let config = await fetchEnv();
    const ls = JSON.parse(config);
    await createObject(ls[process.env["ENV"].toUpperCase()]);
    let body = ls["UIUX_SUITE"];
    await createObject(body);
  }
  //console.log("Map ", process.env);
}

//getDataFromNodeProcess();
//uploadFiletoS3();