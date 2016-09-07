/**
 * @file
 * Tenderwolf Diaries Node.js build script.
 */

// Instantiate dependencies and variables.
var Twig       = require('twig'),
    marked     = require('meta-marked'),
    fs         = require('fs'),
    bitballoon = require("bitballoon"),
    path       = '/Users/derek/Documents/PST/journal/',
    posts      = [],
    bb_options = {
      access_token: process.env.BITBALLOON_API_KEY,
      site_id:      "8bdfbb5e-9c08-468d-adc4-d62304a0c91b",
      dir:          "./build"
    },
    files;

// Get blog posts.
files = fs.readdirSync(path);
for (var i = 0, len = files.length; i < len; i++) {
  var file = path + files[i];
  var contents = fs.readFileSync(file, 'utf8');
  posts.push(marked(contents));
}

// Render page template.
Twig.renderFile('index.html.twig', { posts: posts }, (err, html) => {
  fs.writeFile("build/index.html", html, function(err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
});

// Push to BitBalloon.
bitballoon.deploy(bb_options, function(err, deploy) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
