angular.module('BillsApp')
	.service('BillsService', ['$http', '$routeParams', function($http, $routeParams){
		'use strict';

		var bills;
		var currentBill;

		function getCurrentBill(){
			return currentBill;
		}

		function getAllBills(callback){
			if(bills){
				return bills;
			}
			else{
				$http.get('bill/all').
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
				//$http.post('/slideshows/new', slide).success(function(data, status, headers, config){
				$http.put('/bill', bill).
					success(function(data){
						bills = data;
						callback();
					});
			}
			else{
				$http.post('/bill', bill).
					success(function(data){
						bills = data;
						callback();
					});
			}
		}

		return{
			getAllBills: getAllBills,
			getCurrentBill : getCurrentBill,
			setCurrentBill: setCurrentBill,
			save: save
		};
	}]);