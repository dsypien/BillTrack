angular.module('BillsApp')
	.service('BillsService', ['$http', '$routeParams', function($http, $routeParams){
		'use strict';

		var bills;
		var currentBill;

		function getBill(id, callback){
			$http.get('bill/' + id).
				success(function(data){
					callback(data);
				});
		}

		function getAllBills(callback){
			if(bills){
				callback(bills);
			}
			else{
				$http.get('bill/' + "all").
				success(function(data, status, headers, config){
					bills = data;
					callback(data);
				});
			}
		}

		function setCurrentBill(bill){
			currentBill = bill;
		}

		function save(bill, callback){
			var billStr = JSON.stringify(bill);

			if(bill.id){
				$http.put('/bill', bill).
					success(function(data){
						bills = data;
						callback(data);
					});
			}
			else{
				$http.post('/bill', bill).
					success(function(data){
						bills = data;
						callback(data);
					});
			}
		}

		function deleteBill(bill, callback){
			bill._method = 'delete';

			$http.post('/bill', bill).
				success(function(data){
					bills = data;
					callback(data);
				});

		}

		return{
			getAllBills: getAllBills,
			getBill : getBill,
			setCurrentBill: setCurrentBill,
			save: save,
			deleteBill : deleteBill
		};
	}]);