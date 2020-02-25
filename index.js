'use strict';
const fetch = require("node-fetch");
const btoa = require('btoa');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const callbackFunction = require('./src/docusign-callback');
const cron = require('./src/docusign-cron');

module.exports.docusign = async event => {

  if (event.path === '/docusign_auth_callback') {
    // this is the callback from Docusign.
    return await callbackFunction(event);
  }
  return await cron();

};
