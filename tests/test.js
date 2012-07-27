var GA = require("../lib/googalytics.js");
var should = require("should");
var assert = require("assert");

describe('initialize', function () {
  it('should connect', function (done) {
    GA.initialize('UA-23254218-1', 'raquelvelez.com', done);
  });
});

describe('page views', function () {
  it('should print out the right stuff', function (done){
    GA.pageView('something', 'somethingelse', done);
  });
});

describe('events', function() {
  it('should register an event', function (done) {
    GA.event('tester', 'boom', done);
  });
});