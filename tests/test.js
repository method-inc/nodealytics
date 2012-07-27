var GA = require("../lib/googalytics.js");
var should = require("should");
var assert = require("assert");

describe('initialize', function () {
  it('should connect', function (done) {
    GA.initialize('UA-33709401-1', '', done);
  });
});

describe('page views', function () {
  it('should register a page view', function (done){
    GA.trackPage('some title', 'some page', function (err, resp) {
      resp.statusCode.should.eql(200);
      done();
    });
  });

});

describe('events', function() {
  it('should register an event', function (done) {
    GA.trackEvent('test event', 'boom', function (err, resp) {
      resp.statusCode.should.eql(200);
      done();
    });
  });
});

