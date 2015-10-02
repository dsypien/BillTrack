angular.module('BillsApp')
	.service('BillsService', ['$http', '$routeParams', function($http, $routeParams){
		'use strict';

		var bills;
		var currentBill;

		function getCurrentBill(){
			return currentBill;
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
			getCurrentBill : getCurrentBill,
			setCurrentBill: setCurrentBill
		};
	}]);