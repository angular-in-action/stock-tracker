var express = require('express');
var path = require('path');

// Express App
var app = express();

var PORT = 8080;
var DIST_DIR = path.join(__dirname, '..', 'dist');

app.use('/lib', express.static(DIST_DIR + '/lib'));
app.use('/client', express.static(DIST_DIR + '/client'));

var router = express.Router();

router.get('*', function(req, res) {
  res.sendFile(DIST_DIR + '/client/index.html');
});

app.use('/', router);

app.listen(PORT, function() {
  console.log('Listen on http://localhost:' + PORT);
});
