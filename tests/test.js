var GA = require("../lib/googalytics.js");
var should = require("should");
var assert = require("assert");

describe('initialize', function () {
  it('should connect', function (done) {
    GA.initialize('UA-33709401-1', '', done);
  });
});

describe('page views', function () {
  it('should register an event', function (done){
    GA.pageView('some title', 'some page', done);
    
  });

});

describe('events', function() {
  it('should register an event', function (done) {
    GA.event('test event', 'boom', done);
  });
});