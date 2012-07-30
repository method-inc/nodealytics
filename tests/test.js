var GA = require("../lib/main.js");
var should = require("should");

describe('initialize', function () {
  it('should require an account ID', function (done) {
    GA.initialize('', '', function (err, resp) {
      err.message.should.eql('Account ID is invalid');
      done();
    });
  });

  it('should require a domain', function (done) {
    GA.initialize('UA-12345678-1', '', function (err, resp) {
      err.message.should.eql('Domain is invalid');
      done();
    });
  });

  it('should initialize with the appropriate parameters', function (done) {
    GA.initialize('UA-33709401-1', 'testsite.com', done);
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

