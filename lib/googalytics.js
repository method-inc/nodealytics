var request = require('request');
var _ = require('underscore')._;

var randomId = function (seed) {
  if (seed) {
    return Math.floor(Math.random() * seed + 1000000000);
  }

  return Math.floor(Math.random() * 8999999999 + 1000000000);
};

var cookieParams = function () {
  var utma1 = randomId();
  var utma2 = randomId();
  var today = Date.now();

  var str1 = '1.' + utma1 + '00145214523.' + utma2 + '.' + today + '.' + today + '.15';
  
  return '__utma=' + str1 + ';+__utmz=1.' + today + '.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none);';
};

var GOOGLE_HOST = 'www.google-analytics.com';
var BEACON_PATH = '/__utm.gif';
var USER_AGENT = 'Googalytics Agent';

var options = {
  utmwv : "4.4sh", // GA version
  utmcs : "UTF-8", // charset
  utmul : "en-us", // language

  utmn : randomId(),
  utmhid : randomId(),
  user_agent : USER_AGENT,

  custom_vars : [] // TODO: Implement custom variables
};


exports.initialize = function(accountId, domain, callback) {
  options.utmac = accountId;
  options.utmhn = domain;

  return callback();
};


exports.pageView = function (title, page, utmhid, callback) {
  if (typeof utmhid === 'function') {
    callback = utmhid;
    utmhid = undefined;
  }

  if (typeof options.utmac === 'undefined') {
    return new Error('Google Analytics Account ID is undefined');
  }
  if (typeof options.utmhn === 'undefined') {
    return new Error('Google Analytics Domain is undefined');
  }
  
  var pageViewParams = {
    utmwv : options.utmwv,
    utmn : options.utmn,
    utmhn : options.utmhn,
    utmcs : options.utmcs,
    utmul : options.utmul,
    utmdt : title,
    utmhid : ( utmhid || randomId() ),
    utmp : page,
    utmac : options.utmac,
    utmcc : cookieParams()
  };

  return this.runQuery(pageViewParams, callback);
};

exports.runQuery = function (params, callback) {
  
  var query = 'http://' + GOOGLE_HOST + BEACON_PATH + '?';

  _.each(params, function (val, key) {
    query += key + '=' + val + '&';
  });
  query = query.slice(0,-1);

  request.get(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body); 
    }
    return callback();
  });

};