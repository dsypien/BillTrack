angular.module('BillsApp')
	.service('BillsService', ['$http', '$routeParams', function($http, $routeParams){
		'use strict';

		var bills;
		var currentBill;

		function getBill(){
			var index = $routeParams.index;
			return bills[index];
		}

		function getAllBills(callback){
			$http.get('bill/all').
				success(function(data, status, headers, config){
					callback(data);
				});
		}

		function setCurrentBill(bill){
			currentBill = bill;
		}

		return{
			getAllBills: getAllBills,
			getBill : getBill,
			setCurrentBill: setCurrentBill
		};
	}]);