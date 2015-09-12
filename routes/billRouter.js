var express = require('express');
var bill = require('../shared/bill')();
var router = express.Router();

// GET
router.get('/', function(req, res) {
  bill.get(req.query.id, function(err, item){
  	if(err){
  		res.json({'err': err});
  	}
  	else{
  		res.json(item);
  	}
  })
});

// POST and DELETE
router.post('/', function(req, res){
	if(req.query._method === 'delete'){
		// DELETE
		console.log(req.query);
		bill.remove(req.query.id, function(err){
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
		bill.insert(req.query, function(err, items){
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
	bill.update(req.query, function(err){
		if(err){
			res.json({'err': err});
		}
		else{
			res.json({'success': true});
		}
	});
});

module.exports = router;
