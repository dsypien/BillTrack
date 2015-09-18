var orm = require("orm");

module.exports.Bill = null;
module.exports.Snapshot = null;
module.exports.Signature = null;

module.exports.init = function(callback){
	try{
		orm.connect("sqlite://BillTrack.db", function(err, db){
			if(err){
				console.log(err);
				throw err;
			}

			// Table definitions
			var Bill = db.define("Bill", {
				name: String,
				service_summary: String,
				price: Number,
				description: String,
				snapshot_ids: Object,
				signature_ids: Object
			});

			var Snapshot = db.define("Snapshot", {
				img : String
			});

			var Signature = db.define("Signature", {
				img : String
			});


			Bill.sync(function(err){});
			Snapshot.sync(function(err){});
			Signature.sync(function(err){});

			if(err){
				callback(err);
			}
			else{
				module.exports.Bill = Bill;
				module.exports.Snapshot = Snapshot;
				module.exports.Signature = Signature;

				callback(null);
			}
		});
	}
	catch(e){
		console.log("error " + e);
	}
};