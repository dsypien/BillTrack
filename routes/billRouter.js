var express = require('express');
var bill = require('../shared/bill')();
var snapshot = require('../shared/snapshot')();
var router = express.Router();

function _getAll(callback){
	bill.getAll(function(err, item){
  		if(err){
  			callback({'err': err});
  		}
  		else{
  			callback(item);	
  		}
  	});
}

// GET
router.get('/all', function(req, res, next) {
  	_getAll(function(bills){
  		res.json(bills);
  	});
});

router.get('/:id', function(req, res) {
  bill.get(req.params.id, function(err, items){
  	console.log("Getting bill with id " + req.params.id);
  	if(err){
  		res.json({'err': err});
  	}
  	else{
		res.json(items[0]);
  	}
  })
});

router.get('/snapshot', function(req,res){
	snapshot.get(req.body.id, function(err, items){
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
	console.log(req.body);
	if(req.body._method === 'delete'){
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
		snapshot.insert(req.body.snapshot, function(err){
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
	if(req.body._method === 'delete'){
		// DELETE
		console.log(req.body);
		bill.remove(req.body.id, function(err){
			if(err){
				res.json({'err': err});
			}
			else{
				_getAll(function(bills){
		  			res.json(bills);
		  		});
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
		  		_getAll(function(bills){
		  			res.json(bills);
		  		});
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
			_getAll(function(bills){
	  			res.json(bills);
	  		});
		}
	});
});

module.exports = router;
