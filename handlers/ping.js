'use strict';
const url = require('url');

exports.handler = function(event, context, callback) {
  if (!hasValidUrl(event)) {
    return callback(null, { status: 400, body: 'URL is required, remember to include the protocol too (http/https)' });
  }

  const targetUrl = event.queryStringParameters.url;
  const urlObject = url.parse(targetUrl);
  const http = urlObject.protocol === 'https:' ? require('https') : require('http');

  console.log(`[INFO] - Checking ${targetUrl}`);

  const request = http.request(urlObject, (result) => {
    if (result.statusCode !== 200) {
      return requestError(`Server responsed with unexpected status code: ${result.statusCode}`, callback);
    } 
    return requestEnded(callback);
  }).on('error', (e) => requestError(e, callback));

  request.end();
};

function hasValidUrl(event) {
  return event && event.queryStringParameters && 
          event.queryStringParameters.url &&
          event.queryStringParameters.url.indexOf('http') === 0;
}

function requestEnded(callback) {
  console.log('[INFO] - Response end');
  callback(null, { status: 204 });
}

function requestError(e, callback) {
  console.log('[ERROR] - ' + e.message);
  callback(e);
}
