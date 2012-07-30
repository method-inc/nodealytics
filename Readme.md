# Googalytics

Simple node module to send custom server-side events to Google Analytics

Heavily influenced by the Gabba project from the guys at the Hybrid Group (http://github.com/hybridgroup/gabba)

## Examples

### Initialize

```javascript
var GA = require("googalytics");
GA.initialize('UA-12345678-1', 'someplace.com', function () {
  GA.trackPage('page title', 'pageName', function (err, resp) {
    if (!err, resp.statusCode === 200) {
      console.log('it worked!');
    }
  });
});
```

### What do those variables mean?!

The answers, as per usual, can be learned from the Google: https://developers.google.com/analytics/resources/articles/gaTrackingTroubleshooting#gifParameters