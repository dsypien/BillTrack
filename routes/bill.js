var express = require('express');
var db = require('./shared/db');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('send bill');
});

module.exports = router;
