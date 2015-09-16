var orm = require("orm");

module.exports.Bill = null;
module.exports.Snapshot = null;
module.exports.Signature = null;

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
				description: String
			});

			var Snapshot = db.define("Snapshot", {
				photo : Buffer
			});

			var Signature = db.define("Signature", {
				photo : Buffer
			});

			//Associations

			// Bill.hasMany("snapshots",
			// 	{photo : Buffer},
			// 	{key : true, autoFetch : true}
			// );

			// Bill.hasMany("signa")

			Snapshot.hasOne("Bill", Bill, {
			    reverse : "snapshots"
			});

			Signature.hasOne("Bill", Bill, {
			    reverse : "signatures"
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