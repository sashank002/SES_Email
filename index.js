const express = require("express");
var AWS = require("aws-sdk");
const dotenv = require("dotenv");
const mailroute = require("./routers/mailroutes");
const firstTemplate = require("./template/first");

const app = express();

dotenv.config({
  path: "./config.env",
});

// verifying credentials of aws
AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

app.use(express.json());

app.use(mailroute);

// for updating the region to current region as per aws console
AWS.config.update({ region: "us-east-1" });
// console.log("Region: ", AWS.config.region);

const ses = new AWS.SES();

ses.createTemplate(firstTemplate, (err, data) => {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log("data: ", data); // successful response
});

// ________________ for getting verified email id____________
var params = {
  IdentityType: "EmailAddress",
  MaxItems: 10,
};

var listIDsPromise = new AWS.SES({ apiVersion: "2010-12-01" })
  .listIdentities(params)
  .promise();

listIDsPromise
  .then(function (data) {
    console.log("identities", data.Identities);
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });

app.listen(process.env.PORT, () => {
  console.log("server is running at port ", process.env.PORT);
});
