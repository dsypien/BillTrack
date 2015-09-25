var db = require('../shared/db');

module.exports = function(){
	function get(id, callback){
		db.Bill.find({ id: id }, function(err, bill){
			callback(err, bill);
		});
	}

	function insert(billData, callback){
			console.log(billData.name);
    		console.log(billData.service_summary);
    		console.log(billData.price);
    		console.log(billData.description);

		db.Bill.create([{
			name : billData.name,
    		service_summary : billData.service_summary,
    		price : billData.price,
    		description : billData.description
		}], function(err, items){	
			console.log("Error: " + err);					
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
			callback(err);
		});
	}

	function getAll(callback){
		db.Bill.find(function(err, items){
			callback(err, items);
		});
	}

	return{
		get: get,
		getAll: getAll,
		insert: insert,
		update: update,
		remove: remove
	}
};
