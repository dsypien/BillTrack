var express = require('express');
var bills = require('../shared/bills')();
var router = express.Router();

router.get('/', function(req, res, next) {
  	bills.get(function(err, item){
  		if(err){
  			res.json({'err': err});
  		}
  		else{
  			res.json(item);	
  		}
  	})
});

module.exports = router;