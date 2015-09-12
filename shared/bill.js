var db = require('../shared/db');

module.exports = function(){
	function get(id, callback){
		db.Bill.find({ id: id }, function(err, bill){
			callback(err, bill);
		});
	}

	function insert(billData, callback){
		db.Bill.create([{
			name : billData.name,
    		service_description : billData.service_description,
    		price : billData.price,
    		description : billData.description
		}], function(err, items){
			callback(err, items);
		});
	}

	function update(billData, callback){
		db.Bill.find({ id: billData.id }).each(function (bill) {
    		bill.name = billData.name;
    		bill.service_description = billData.service_description;
    		bill.price = billData.price;
    		bill.description = billData.description;
		}).save(function (err) {
		    callback(err);
		});
	}

	function remove(id, callback){
		db.Bill.find({ id: id }).remove(function (err) {
			console.log(err);
			callback(err);
		});
	}

	return{
		get: get,
		insert: insert,
		update: update,
		remove: remove
	}
};