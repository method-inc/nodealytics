# Nodealytics

(Formerly Googalytics)

Simple node module to send custom server-side events to Google Analytics

Heavily influenced by the Gabba project from the guys at the Hybrid Group (http://github.com/hybridgroup/gabba)

## Usage

`npm install nodealytics`

```javascript
//INITIALIZE
var NA = require("nodealytics");
NA.initialize('UA-12345678-1', 'someplace.com', function () {
  //MORE GOOGLE ANALYTICS CODE HERE
});
```

## Examples

### Track Page

```javascript
NA.trackPage('page title', 'pageName', function (err, resp) {
  if (!err, resp.statusCode === 200) {
    console.log('it worked!');
  }
});
```

### Track Page with Referal

```javascript
NA.trackPage('page title', 'pageName', {utmr:"http://www.google.com"} function (err, resp) {
  if (!err, resp.statusCode === 200) {
    console.log('it worked!');
  }
});
```

### Track Event

```javascript
NA.trackEvent('test event', 'boom', function (err, resp) {
  if (!err, resp.statusCode === 200) {
    console.log('it worked!');
  }
});
```


### What do those variables mean?!

The answers, as per usual, can be learned from the Google: https://developers.google.com/analytics/resources/articles/gaTrackingTroubleshooting#gifParameters
