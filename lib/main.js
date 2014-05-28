var request = require('request');

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


var eventData = function (category, action, label, value) {
  var data = '5(' + category + '*' + action;
  if (label) {
    data += '*' + label + ')';
  } else {
    data += ')';
  }
  if (value) {
    data += '(' + value + ')';
  }
  return data;
};

var GOOGLE_HOST = 'www.google-analytics.com';
var BEACON_PATH = '/__utm.gif';
var USER_AGENT = 'Nodealytics Agent';

var options = {
  utmwv : "4.4sh", // Google Analytics version
  utmcs : "UTF-8", // charset
  utmul : "en-us", // language

  utmn : randomId(),
  utmhid : randomId(),
  user_agent : USER_AGENT,

  custom_vars : [] // TODO: Implement custom variables
};


exports.initialize = function(accountId, domain, callback) {
  options.utmac = accountId;
  if (!/UA-[0-9-]+[0-9]+/i.test(accountId)) {
    return callback(new Error('Account ID is invalid'));
  }

  if (domain.length < 1) {
    return callback(new Error('Domain is invalid'));
  }

  options.utmhn = domain;

  if (callback) {
    return callback();
  }
};

exports.setProxy = function(proxyAddress) {
  request = request.defaults({
    proxy : proxyAddress, 
    agent : false
  });
}

exports.trackPage = function (title, page, params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
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
    utmhid : randomId(),
    utmp : page,
    utmac : options.utmac,
    utmcc : cookieParams()
  };

  Object.keys(params).forEach(function (key, i) {
    pageViewParams[key] = params[key];
  });

  return this.runQuery(pageViewParams, callback);
};

exports.trackEvent = function (category, action, label, value, utmni, utmhid, callback) {
  if (typeof label === 'function') {
    callback = label;
    label = undefined;
  } else if (typeof value === 'function') {
    callback = value;
    value = undefined;
  } else if (typeof utmni === 'function') {
    callback = utmni;
    utmni = undefined;
  } else if (typeof utmhid === 'function') {
    callback = utmhid;
    utmhid = undefined;
  }

  if (typeof options.utmac === 'undefined') {
    return callback(new Error('Google Analytics Account ID is undefined'));
  }
  if (typeof options.utmhn === 'undefined') {
    return callback(new Error('Google Analytics Domain is undefined'));
  }

  if (typeof utmni !== 'undefined' && typeof utmni !== 'boolean') {
    return callback(new Error('utmni must be a boolean'));
  }

  var eventParams = {
    utmwv : options.utmwv,
    utmn : options.utmn,
    utmhn : options.utmhn,
    utmt : 'event',
    utme : eventData(category, action, label, value), // #{custom_var_data}, TODO: work on custom data
    utmcs : options.utmcs,
    utmul : options.utmul,
    utmhid : (utmhid || randomId()),
    utmac : options.utmac,
    utmcc : options.utmcc || cookieParams()
  };

  if (utmni) {
    eventParams.utmni = 1; // 1 for non interactive event, excluded from bounce calcs
  }

  return this.runQuery(eventParams, callback);
};

exports.mapParams = function(params) {
  var result = '';

  Object.keys(params).forEach(function (key, i) {
    result += key + '=' + params[key] + '&';
  });
  result = result.slice(0, -1);

  return result;
};

exports.runQuery = function (params, callback) {
  var query = 'http://' + GOOGLE_HOST + BEACON_PATH + '?';

  query += exports.mapParams(params);

  request.get(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
    }
    if (callback) {
      return callback(error, response);
    }
  });

};

exports.VERSION = '0.0.5';

