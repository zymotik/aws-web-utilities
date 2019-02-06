'use strict';
const url = require('url');

exports.handler = function(event, context, callback) {
  const response = {
    statusCode: 204,
    body: null,
  };

  if (hasValidUrl(event)) {
    const targetUrl = event.queryStringParameters.url;
    const urlObject = url.parse(targetUrl);
    const loader = require(urlObject.protocol.substring(0, urlObject.protocol.length - 1));

    console.log(`[INFO] - Checking ${targetUrl}`);

    const request = loader.request(urlObject, (result) => {
      result.setEncoding('utf8');
      
      result.on('data', requestDataReceived);
  
      result.on('end', () => requestEnded(() => callback(null, response)));
    });
  
    request.on('error', (e) => requestError(e, callback));
  
    request.end();
  } else {
    response.statusCode = 400;
    response.body = 'URL is required, remember to include the protocol too (http/https)';
    callback(null, response);
  }
};

function hasValidUrl(event) {
  return event && event.queryStringParameters && 
          event.queryStringParameters.url &&
          event.queryStringParameters.url.indexOf('http') === 0;
}

function requestDataReceived(chunk) {
  console.log('[INFO] - Read body chunk');
}

function requestEnded(callback) {
  console.log('[INFO] - Response end');
  callback();
}

function requestError(e, callback) {
  console.log('[ERROR] - ' + e.message);

  callback(e);
}