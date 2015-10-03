angular.module('BillsApp')
	.controller('AllBillsController', ['$scope', '$http', '$location', 'BillsService', function($scope, $http, $location, BillsService){
		'use strict';

		$scope.openBill = function(bill, event){
			BillsService.setCurrentBill(bill);
			$location.path('/bill');
			event.stopPropagation();
			event.preventDefault();
		};

		$scope.newBill = function(event){
			BillsService.setCurrentBill(null);
			$location.path('/bill');
			event.stopPropagation();
			event.preventDefault();
		};

		function init(){
			BillsService.getAllBills(function(bills){
				$scope.bills = bills;
			});
		}

		init();

	}]);