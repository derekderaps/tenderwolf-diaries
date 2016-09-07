/**
 * @file
 * Deploy The Tenderwolf Diaries build artifacts to BitBalloon.
 */

var bitballoon = require("bitballoon"),
    options    = {
      access_token: process.env.BITBALLOON_API_KEY,
      site_id:      "8bdfbb5e-9c08-468d-adc4-d62304a0c91b",
      dir:          "./build"
    };

bitballoon.deploy(options, function(err, deploy) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('BitBalloon deployment successful.');
});
