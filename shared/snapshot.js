var db = require("../shared/db");

module.exports = function(){
	function insert(imgData, callback){
		db.Snapshot.create([{
			photo: imgData
		}], function(err,items){
			callback(err, items);
		});
	}

	function remove(id, callback){
		db.Snapshot.find({id:id}).remove(function(err){
			callback(err);
		});
	}

	function removeAll(callback){
		db.Snapshot.find().remove(function(err){
			callback(err);
		});
	}

	function get(id, callback){
		db.Snapshot.find({id:id}, function(err, items){
			items.forEach(function(element, index, ary){
				console.log(element.photo);
				if(element.photo){
					element.photo = element.photo.replace(/\s/g, '+');
				}				
			});

			callback(err, items);
		});
	}

	function getAll(callback){
		db.Snapshot.find(function(err,items){
			items.forEach(function(element, index, ary){
				console.log(element.photo);
				if(element.photo){
					element.photo = element.photo.replace(/\s/g, '+');
				}				
			});
			callback(err, items);
		});
	}

	return{
		get: get,
		getAll: getAll,
		insert: insert,
		remove: remove,
		removeAll : removeAll
	}
};