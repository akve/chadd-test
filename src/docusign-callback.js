'use strict';
const fetch = require("node-fetch");
const btoa = require('btoa');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = async (event) => {
  const authCode = btoa(`${process.env.DS_CLIENT_ID}:${process.env.DS_SECRET}`);

  const res = await fetch(process.env.TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authCode}`
    },
    body: `grant_type=authorization_code&code=${event.queryStringParameters.code}`
  })
  const json = await res.json();
  await s3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: process.env.OUTPUT_FILE,
    Body: JSON.stringify(json, null, 2),
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(json, null, 2)
  }
}
