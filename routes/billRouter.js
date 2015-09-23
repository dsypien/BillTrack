var express = require('express');
var bill = require('../shared/bill')();
var snapshot = require('../shared/snapshot')();
var router = express.Router();

// GET
router.get('/:id', function(req, res) {
  bill.get(req.params.id, function(err, item){
  	console.log("Getting bill with id " + req.params.id);
  	if(err){
  		res.json({'err': err});
  	}
  	else{
  		res.json(item);
  	}
  })
});

router.get('/', function(req, res, next) {
  	bills.getAll(function(err, item){
  		console.log("Getting All");
  		if(err){
  			res.json({'err': err});
  		}
  		else{
  			res.json(item);	
  		}
  	})
});

router.get('/snapshot', function(req,res){
	snapshot.get(req.query.id, function(err, items){
		if(err){
			res.json({'err':err});
		}
		else{
			res.json(items);
		}
	});
});

router.get('/snapshot/*', function(req,res){
	snapshot.getAll(function(err, items){
		if(err){
			res.json({'err':err});
		}
		else{
			res.json(items);
		}
	});
});

router.post('/snapshot', function(req,res){
	if(req.query._method === 'delete'){
		snapshot.removeAll(function(err){
			if(err){
				res.json({'err':err});
			}
			else{
				res.json({'success' : true});
			}
		});
	}
	else
	{
		snapshot.insert(req.query.snapshot, function(err){
		if(err){
			res.json({'err':err});
		}
		else{
			res.json({'success' : true});
		}
	});
	}
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
