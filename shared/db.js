var orm = require("orm");

module.exports.Bill = null;

module.exports.init = function(callback){
	try{
		orm.connect("sqlite://BillTracker.db", function(err, db){
			if(err){
				console.log(err);
				throw err;
			}

			// Table definitions

			var Bill = db.define("Bill", {
				name: String,
				service_description: String,
				price: Number,
				snapshots: []
			});

			Bill.sync(function(err){});	

			if(err){
				callback(err);
			}
			else{
				module.exports.Bill = Bill;

				callback(null);
			}
		});
	}
	catch(e){
		console.log("error " + e);
	}
};