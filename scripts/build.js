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
posts.hawkeye = getBlogPosts('./posts/hawkeye/', 'primary');
posts.jacqui  = getBlogPosts('./posts/jacqui/', 'success');
posts.all     = posts.hawkeye.concat(posts.jacqui).sort(comparePostDates);

// Render page template.
Twig.renderFile('./templates/index.html.twig', { posts: posts }, (err, html) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Rendered index.html.twig.')
  fs.writeFile("./build/index.html", html, function(err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Wrote index.html to file.')
  });
});

function getBlogPosts(path, style) {
  var files        = fs.readdirSync(path),
      posts        = [],
      gitbookFiles = [
        'README.md',
        'SUMMARY.md'
      ];
  for (var i = 0, len = files.length; i < len; i++) {
    var file = files[i];
    if (file.endsWith('.md') && gitbookFiles.indexOf(file) === -1) {
      var contents = fs.readFileSync(path + file, 'utf8'),
          post     = metaMarked(contents);
      post.panelStyle = 'panel-' + style;
      posts.push(post);
    }
  }
  return posts.sort(comparePostDates);
}

function comparePostDates(a, b) {
  aDate = new Date(a.meta.date);
  bDate = new Date(b.meta.date);
  return bDate.getTime() - aDate.getTime();
}
