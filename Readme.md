# Nodealytics

(Formerly Googalytics)

Simple node module to send custom server-side events to Google Analytics

Heavily influenced by the Gabba project from the guys at the Hybrid Group (http://github.com/hybridgroup/gabba)

## Usage

`npm install nodealytics`

```javascript
// initialize
var NA = require("nodealytics");
NA.initialize('UA-12345678-1', 'someplace.com', function () {
  //MORE GOOGLE ANALYTICS CODE HERE
});
```

## Examples

### Track Page

```javascript
NA.trackPage('Page Title', '/page/path', function (err, resp) {
  if (!err && resp.statusCode === 200) {
    console.log('Page has been tracked with Google Analytics');
  }
});
```

### Track Page with Referal

```javascript
NA.trackPage('Page Title', '/page/path', {utmr:"http://www.google.com"}, function (err, resp) {
  if (!err && resp.statusCode === 200) {
    console.log('Page has been tracked with Google Analytics');
  }
});
```

### Track Event

```javascript
NA.trackEvent('test event', 'boom', function (err, resp) {
  if (!err && resp.statusCode === 200) {
    console.log('Event has been tracked with Google Analytics');
  }
});
```

### Set Proxy

```javascript
NA.setProxy('http://your.proxy.com', 'title', function (err, resp) {
  NA.trackEvent(...);
});
```

### What do those variables mean?!

The answers, as per usual, can be learned from the Google: https://developers.google.com/analytics/resources/articles/gaTrackingTroubleshooting#gifParameters
