'use strict';

var express = require('express');
var path = require('path');
var yahooFinance = require('yahoo-finance');

// Express App
var app = express();

var PORT = 8080;
var DIST_DIR = path.join(__dirname, '..', 'dist');

app.use('/lib', express.static(DIST_DIR + '/lib'));
app.use('/client', express.static(DIST_DIR + '/client'));

var router = express.Router();

router.get('/api', function(req, res) {
  if (req.query.symbols) {
    var symbols = req.query.symbols.split(',');
    symbols.map(function(symbol) {
      return symbol.toUpperCase();
    });

    yahooFinance.snapshot({
      symbols: symbols
    }, function(err, snapshot) {
      if (err) {
        res.status(401).send(err);
      }

      setTimeout(function() {
        res.status(200).send(snapshot);
      }, 5000);
    });
  } else {
    res.status(400).send({message: 'The request requires at least one symbol. Try adding "?symbols=appl" to the request.'});
  }
});

router.get('*', function(req, res) {
  res.sendFile(DIST_DIR + '/client/index.html');
});

app.use('/', router);

app.listen(PORT, function() {
  console.log('Listen on http://localhost:' + PORT);
});
