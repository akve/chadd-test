'use strict';
const fetch = require("node-fetch");
const btoa = require('btoa');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = async (event) => {
  const authCode = btoa(`${process.env.DS_CLIENT_ID}:${process.env.DS_SECRET}`);

  const data = await s3.getObject({
    Bucket: process.env.S3_BUCKET,
    Key: process.env.OUTPUT_FILE,
  }).promise();
  const _token = JSON.parse(data.Body.toString('utf-8'));

  const res = await fetch(process.env.TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authCode}`
    },
    body: `grant_type=refresh_token&refresh_token=${_token.refresh_token}`
  });
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
