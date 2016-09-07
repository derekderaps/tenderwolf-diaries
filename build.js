/**
 * @file
 * Tenderwolf Diaries Node.js build script.
 */

// Instantiate dependencies and variables.
var dateFormat = require('dateformat'),
    fs         = require('fs'),
    Twig       = require('twig'),
    metaMarked = require('meta-marked'),
    posts      = {},
    files;

// Get blog posts.
posts.hawkeye = getBlogPosts('./posts/hawkeye/');
posts.jacqui  = getBlogPosts('./posts/jacqui/');
posts.all     = posts.hawkeye.concat(posts.jacqui).sort(comparePostDates);

// Render page template.
Twig.renderFile('index.html.twig', { posts: posts }, (err, html) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Rendered index.html.twig.')
  fs.writeFile("build/index.html", html, function(err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Wrote index.html to file.')
  });
});

function getBlogPosts(path) {
  var files        = fs.readdirSync(path),
      posts        = [],
      gitbookFiles = [
        'README.md',
        'SUMMARY.md'
      ];
  for (var i = 0, len = files.length; i < len; i++) {
    var file = files[i];
    if (file.endsWith('.md') && gitbookFiles.indexOf(file) === -1) {
      var contents = fs.readFileSync(path + file, 'utf8');
      posts.push(metaMarked(contents));
    }
  }
  return posts.sort(comparePostDates);
}

function comparePostDates(a, b) {
  return dateFormat(a.meta.date, 'isoDate') > dateFormat(b.meta.date, 'isoDate');
}
