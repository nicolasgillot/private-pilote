const promise = require('promise/lib/es6-extensions.js');
const promiseRejectionTracking = require('promise/lib/rejection-tracking');

if (typeof Promise === 'undefined') {
  promiseRejectionTracking.enabled();
  window.Promise = promise;
}

Object.assign = require('object-assign');
