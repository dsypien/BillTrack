var express = require('express');
var bill = require('../shared/bill');
var router = express.Router();

// GET
router.get('/', function(req, res) {
  bill.get(function(err, items){
  	if(err){
  		res.json({'err': err});
  	}
  	else{
  		res.json(items);
  	}
  })
});

// POST and DELETE
router.post('/', function(req, res){
	if(req.body._method === 'delete'){
		// DELETE
		bill.deleteBill(req.body.id, function(err){
			if(err){
				res.json({'err': err});
			}
			else{
				res.json({'success': true});
			}
		});
	}
	else{
		//INSERT
		bill.insert(req.body, function(err, items){
			if(err){
		  		res.json({'err': err});
		  	}
		  	else{
		  		res.json(items);
		  	}
		});
	}
});

// UPDATE
router.put('/', function(req, res){
	bill.update(req.body, function(err){
		if(err){
			res.json({'err': err});
		}
		else{
			res.json({'success': true});
		}
	});
});

module.exports = router;
