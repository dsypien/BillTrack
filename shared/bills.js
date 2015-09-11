var db = require('../shared/db');

module.exports = function(){
	function get(callback){
		db.Bill.find(function(err, items){
			callback(err, items);
		});
	}

	return{
		get: get
	}
};