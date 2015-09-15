var db = require("../shared/db");

module.exports = function(){
	function insert(imgData, callback){
		var imgBuffer = new Buffer(imgData, 'base64');

		db.Signature.create([{
			photo: imgBuffer
		}], function(err,items){
			callback(err, items);
		});
	}

	function remove(id, callback){
		db.Signature.find({id:id}).remove(function(err){
			callback(err);
		});
	}

	function get(id, callback){
		db.Signature.find({id:id}, function(err, item){
			var photo = ( new Buffer( item ) ).toString( "base64" );
			callback(err, photo);
		});
	}

	function getAll(callback){
		db.Signature.find(function(err,items){
			callback(err, items);
		});
	}

	return{
		get: get,
		getAll: getAll,
		insert: insert,
		remove: remove
	}
};